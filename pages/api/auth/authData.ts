import * as collections from "../../../helpers/collectionNames";

import { NextApiRequest, NextApiResponse } from "next";

import { API400Error } from './../../../helpers/Api400Error';
import BaseError from '../../../helpers/baseError';
import connect from '../../../dataBase/dataBase';
import {getSession} from 'next-auth/client';

const handler = async (req:NextApiRequest, res:NextApiResponse) =>{
    try{
        if(req.method !== 'GET'){
            throw new API400Error('Error en el tipo de consulta!');
        }

        const session = await getSession({req:req});

        if(!session){
            throw new API400Error('El usuario no esta authenticado!');
        }

        const dbClient = await connect();
        const db = dbClient?.db();
        const userCollection =  db?.collection(collections.USERS);
        const universityCollection =  db?.collection(collections.UNIVERSITIES);

        const user = await userCollection?.findOne({email:session.user?.email});

        if(!user){
            dbClient?.close();
            throw new API400Error('No existe el usuario!');

        }

        const university = await universityCollection?.findOne({_id:user.university_id});
        console.log('University:', university);

        dbClient?.close();
        res.status(200).json({
            user:{
                
                admin:user.admin,
                verified: user.verified,

            },
            university:{
                sigla:university?.sigla,
                configured:university?.configured,
                name: university?.name,
                frontEndCompletePath: university?.frontEndCompletePath

            }
        })
    }catch(error:any){
        console.log('Ocurrió un error:', error);
        if(typeof error === typeof BaseError){
            res.status(error.statusCode).json(error);
        }else{
            res.status(500).json(error);
        }
    }

}
export default handler;