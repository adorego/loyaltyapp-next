import * as collections from "../../../helpers/collectionNames";

import { NextApiRequest, NextApiResponse } from 'next';

import { API400Error } from '../../../helpers/Api400Error';
import { Api404Error } from '../../../helpers/Api404Error';
import { Api500Error } from '../../../helpers/Api500Error';
import bcrypt from 'bcrypt';
import connect from '../../../dataBase/dataBase';
import jwt from 'jsonwebtoken';

const handler = async (request:NextApiRequest, response:NextApiResponse) =>{

    if(request.method === 'POST'){
        
        let dbClient;
        try{

            // const data = JSON.parse(request.body);
            // console.log("Data:", data);
            const {email: userEmail, password} = request.body;
            if(!userEmail || !password){
                 throw new API400Error('Faltan parametros para el ingreso.')
            }
            console.log("email, password:", userEmail, password);
             dbClient = await connect();
             const db = dbClient?.db();
             if(db){
                 console.log("Connected to DB!");
                const userCollection =  db.collection(collections.USERS);
                const universityCollection = db.collection(collections.UNIVERSITIES);
                const user = await userCollection.findOne({email:userEmail});
                if(!(user && bcrypt.compareSync(password, user.hash))){
                    throw new Api404Error('No se encontró el usuario/clave');
                }
                const university = await universityCollection.findOne({_id:user.university_id});
                //Create token if user found
                const token = jwt.sign({user:user._id}, process.env.SECRET_KEY, {expiresIn: '7d'});

                //Response with JWT and data
                response.status(200).json({message:"Successfully logged!", data:{
                    university:{
                    ...university
                    },
                    user:{
                        ...user
                    },
                    token
                }})
                // response.status(200).json({message:"Test ok"});
            }
            
            else{
                 throw new Api500Error('Error en la conexión a la Base de Datos');
            }
    }catch(error:any){
        console.log('Error while loging!', error);
        response.status(400).json(error);
    }finally{
        dbClient?.close();
    }


    }


} 

export default handler;