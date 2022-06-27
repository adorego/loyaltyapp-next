import { MongoClient, ObjectId } from "mongodb";

import API401Error from "../../../../../../helpers/Api401Error";
import APIauthorization from "../../../../../../helpers/APIauthorization";
import { Api500Error } from "../../../../../../helpers/Api500Error";
import { BENEFITS } from "../../../../../../helpers/collectionNames";
import { NextApiRequest } from 'next';
import { NextApiResponse } from 'next';
import connect from '../../../../../../dataBase/dataBase';
import errorHandler from "../../../../../../helpers/errorHandler";
import { getSession } from "next-auth/react";

const handler = async (req:NextApiRequest, res:NextApiResponse) =>{
    const {universityId:universitySiglaId, benefitId} = req.query;
    const session = await getSession({req:req});
    let dbClient:MongoClient| undefined;
    if(req.method === 'PUT'){
        try{
            dbClient = await connect();
            const db = dbClient?.db();
            if(db && session){
                if(!APIauthorization(session, db, res, universitySiglaId, ['admin'])){
                    console.log('El usuario no esta autorizado para realizar esta consulta.');
                    throw new API401Error('El usuario no esta autorizado para realizar esta consulta.');
                }
                
                const body = JSON.parse(req.body);
                    
                    
                if(Object.keys(body).length === 1 && body.hasOwnProperty("landing_template_id")){
                        const {landing_template_id} = body;
                        console.log('landing_template_id:', landing_template_id);
                        const benefitCollection = db.collection(BENEFITS);
                        const options = {
                            upsert:false
                        }
                        const updatedDoc = {
                            $set:{
                                landing_template_id:new ObjectId(landing_template_id)
                            }
                        }
                        const result = await benefitCollection.updateOne({_id:new ObjectId(String(benefitId))},updatedDoc, options);
                        if(result.modifiedCount === 1){
                            console.log('Se modificó el documento');
                            res.status(201);
                        }else{
                            console.log('No se modificó el documento:', result.modifiedCount );
                            throw new Api500Error('Hubo un error durante la actualizacón del sistema');
                        }
                    }
            }else{
                throw new Api500Error('Hubo un error durante la actualizacón del sistema');
            }
            }catch(error:any){
                errorHandler(error, res);
            }finally{
                dbClient?.close(); 
            }
        }
                    
}

export default handler;