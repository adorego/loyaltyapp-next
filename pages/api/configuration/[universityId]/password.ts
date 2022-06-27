import { UNIVERSITIES, USERS } from './../../../../helpers/collectionNames';

import { API400Error } from './../../../../helpers/Api400Error';
import { API401Error } from './../../../../helpers/Api401Error';
import { Api404Error } from './../../../../helpers/Api404Error';
import { NextApiRequest } from 'next';
import { NextApiResponse } from 'next';
import checkPassword from '../../../../helpers/checkPassword';
import connect from '../../../../dataBase/dataBase';
import errorHandler from '../../../../helpers/errorHandler';
import { has } from 'immer/dist/internal';
import hashPassword from '../../../../helpers/hashPassword';

const handler = async (req:NextApiRequest, res:NextApiResponse) =>{
    if(req.method === 'PUT'){
        console.log("req.body", req.body);
        let dbClient;
        try{
            // const data = JSON.parse(req.body);
            // console.log("Received data:", data);
            const {email, password} = req.body;
            console.log("email:", email, "password:", password);
            if(!email || !password ){
                throw new API400Error("Faltan datos para completar esta petición");
            }
            if(!checkPassword(password)){
                throw new API400Error("La clave no cumple con el formato adecuado");
            }
            //Check email existence
        
            dbClient = await connect();
            if(dbClient){
                const db = dbClient.db();
                const userCollection = db.collection(USERS);
                const user = await userCollection.findOne({email:email});
                console.log('user:', user);
                if(!user){
                    throw new Api404Error('El usuario no existe!');
                }
                const hash = await hashPassword(password);
                const result = await userCollection.updateOne(
                    {email:email},
                    {
                        $set:{
                            hash:hash
                        }
                    }
                )
                if(result.modifiedCount === 1){
                    res.status(200).json({message:'Actualización exitosa'});
                }else{
                    res.status(500).json({message:'Error al actualizar la base de datos'})
                }
    


            }

        }catch(error:any){
            console.log("Ocurrio un error:", error);
            errorHandler(error, res);
        }finally{
            dbClient?.close();
        }
    }
}

export default handler;