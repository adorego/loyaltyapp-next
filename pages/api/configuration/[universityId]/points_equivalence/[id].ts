import { MongoClient, ObjectId } from "mongodb";
import { NextApiRequest, NextApiResponse } from "next";

import API401Error from "../../../../../helpers/Api401Error";
import APIauthorization from "../../../../../helpers/APIauthorization";
import BaseError from '../../../../../helpers/baseError';
import {CONFIGURATION} from '../../../../../helpers/collectionNames';
import connect from '../../../../../dataBase/dataBase';
import { getSession } from "next-auth/react";

const handler = async (req:NextApiRequest, res:NextApiResponse) => {
    const {id} = req.query; 
    const {universityId} = req.query;
    const session = await getSession({req});
    const {points, money} = JSON.parse(req.body);
    const dbClient = await connect();
    try{
       
            const db = dbClient?.db();
            if(db && session){
                if(!APIauthorization(session, db, res, universityId, ['admin'])){
                    console.log('El usuario no esta autorizado para realizar esta consulta.');
                    throw new API401Error('El usuario no esta autorizado para realizar esta consulta.');
                }
                const configurationCollection = db?.collection(CONFIGURATION);
                
                
                await configurationCollection?.updateOne(
                    {_id:new ObjectId(String(id))},
                    {
                        $set:{points:points,money:money},
                        $currentDate:{lastModified:true}
                    }
                );
                
                const updatedObject = await configurationCollection?.findOne({_id:new ObjectId(String(id))});
                // dbClient?.close();
               
                
                res.status(200).json(updatedObject);
            }
        
        }catch(error:any){
            
            
    
        }finally{
             dbClient?.close();
        }    
     
    
   
}

export default handler;