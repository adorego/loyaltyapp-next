import { CONFIGURATION, UNIVERSITIES } from './../../../../../helpers/collectionNames';

import { API400Error } from './../../../../../helpers/Api400Error';
import API401Error from '../../../../../helpers/Api401Error';
import APIauthorization from '../../../../../helpers/APIauthorization';
import { Api404Error } from './../../../../../helpers/Api404Error';
import { NextApiRequest } from 'next';
import { NextApiResponse } from 'next';
import { ObjectId } from 'mongodb';
import connect from '../../../../../dataBase/dataBase';
import errorHandler from '../../../../../helpers/errorHandler';
import { getSession } from 'next-auth/react';

const handler = async (req:NextApiRequest, res:NextApiResponse) =>{
    if(req.method === 'PUT'){
        const {universityId:universitySigla} = req.query;
        const session = await getSession({req});
        const {headerColor, textHeaderColor} = req.body;
        
        let dbClient;
        try{
            dbClient = await connect();
            const db = dbClient?.db();
            if(db && session){
                // APIauthorization(res ,universitySigla, ['admin']);
                if(!APIauthorization(session, db, res, universitySigla, ['admin'])){
                     console.log('El usuario no esta autorizado para realizar esta consulta.');
                     throw new API401Error('El usuario no esta autorizado para realizar esta consulta.');
                }
                if(!headerColor || !textHeaderColor){
                    console.log('No se enviaron todos los parametros requeridos.');
                    throw new API400Error('No se enviaron todos los parametrosrequeridos');
                }
                const universityCollection = db.collection(UNIVERSITIES)
                const configurationCollection = db.collection(CONFIGURATION);
                const university = await universityCollection.findOne({sigla:universitySigla});
                
                const options = {upsert:false}
                const updatedDoc = {
                    $set:{
                        headerColor:headerColor,
                        textHeaderColor: textHeaderColor
                    }
                };
                console.log('updatedDoc:', updatedDoc);
                if(university){
                    const updateResult = await configurationCollection.updateOne({university_id:new ObjectId(university._id)},
                        updatedDoc, options);
                    
                    res.status(201).json({message:"Actualización exitosa"});
                        

                }else{
                    throw new Api404Error('No se encuentra la Universidad');
                }
                

            }
        }
        catch(error:any){
            errorHandler(error, res);
        }
    }
}

export default handler;