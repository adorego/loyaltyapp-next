import { NextApiRequest, NextApiResponse } from "next";
import { UNIVERSITIES, USERS } from './../../helpers/collectionNames';

import { API401Error } from '../../helpers/Api401Error';
import { Api500Error } from './../../helpers/Api500Error';
import LoginResponseInterface from "../../data/Login-response-interface";
import connect from '../../dataBase/dataBase';
import errorHandler from "../../helpers/errorHandler";
import {getSession} from 'next-auth/react';

const handler = async (req:NextApiRequest, res:NextApiResponse<LoginResponseInterface>) =>{
    if(req.method === 'GET'){
        try{
            const session = await getSession({req});
            console.log('Session:', session);
            if(!session){
                throw new API401Error('El usuario no esta authenticado.')
            }
            const dbClient = await connect();
            const db = dbClient?.db();
            if(db){
                const userCollection = db.collection(USERS);
                const universityCollection = db.collection(UNIVERSITIES);
                const user = await userCollection.findOne({email:session.user?.email});
                const university = await universityCollection.findOne({_id:user?.university_id});
                res.status(200).json(
                    {
                        university:{
                            _id:String(university?._id),
                            name:university?.name,
                            sigla:university?.sigla
                        },
                        user:{
                            _id:String(user?._id),
                            email:user?.email,
                            admin:user?.admin,
                            verified:user?.verified
                        }
                    }
                )
            }else{
                throw new Api500Error('Error en la conexión con la Base de Datos');
            }
        }catch(error:any){
            errorHandler(error, res);
        }

    }

}
export default handler;