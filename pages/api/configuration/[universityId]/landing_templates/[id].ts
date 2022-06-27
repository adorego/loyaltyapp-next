import { BENEFITS, LANDING_TEMPLATES } from './../../../../../helpers/collectionNames';

import { API400Error } from './../../../../../helpers/Api400Error';
import API401Error from '../../../../../helpers/Api401Error';
import API404Error from '../../../../../helpers/Api404Error';
import APIauthorization from '../../../../../helpers/APIauthorization';
import { Api500Error } from '../../../../../helpers/Api500Error';
import { MongoClient } from 'mongodb';
import { NextApiRequest } from 'next';
import { NextApiResponse } from 'next';
import { ObjectId } from 'mongodb';
import connect from '../../../../../dataBase/dataBase';
import errorHandler from '../../../../../helpers/errorHandler';
import { getSession } from 'next-auth/react';

const handler = async (req:NextApiRequest, res:NextApiResponse) =>{
    if(req.method === 'GET'){
        const {universityId:universitySiglaId, id: landing_template_id} = req.query;
        const session = await getSession({req:req});
        let dbClient:MongoClient| undefined;
        try{
            if(!landing_template_id || !universitySiglaId){
                throw new API400Error('Faltan parametros para esta consulta');
            }
            dbClient = await connect();
            const db = dbClient?.db();
            if(db && session){
                if(!APIauthorization(session, db, res, universitySiglaId, ['admin'])){
                    console.log('El usuario no esta autorizado para realizar esta consulta.');
                    throw new API401Error('El usuario no esta autorizado para realizar esta consulta.');
                }
                const landingTemplateCollection = db.collection(LANDING_TEMPLATES);
                const landingTemplate = await landingTemplateCollection.findOne({_id:new ObjectId(String(landing_template_id))});
                if(!landingTemplate){
                    throw new API404Error('No se encontró el modelo de Landing');
                }else{
                    res.status(200).json({
                        landingTemplate
                    })
                }
            }

        }
        catch(error:any){
            errorHandler(error, res);
        }finally{
            dbClient?.close();
        }
        
    }
    if(req.method === 'DELETE'){
        const {universityId:universitySiglaId, id: landing_template_id} = req.query;
        const session = await getSession({req:req});
        let dbClient:MongoClient| undefined;
        try{
            if(!landing_template_id || !universitySiglaId){
                throw new API400Error('Faltan parametros para esta consulta');
            }
            // console.log("landing_template_id:", landing_template_id);
            dbClient = await connect();
            const db = dbClient?.db();
            if(db && session){
                if(!APIauthorization(session, db, res, universitySiglaId, ['admin'])){
                    console.log('El usuario no esta autorizado para realizar esta consulta.');
                    throw new API401Error('El usuario no esta autorizado para realizar esta consulta.');
                }
                const landingTemplateCollection = db.collection(LANDING_TEMPLATES);
                const result = await landingTemplateCollection.deleteOne({_id:new ObjectId(String(landing_template_id))});
                console.log("result:", result);
                const benefitCollection = db.collection(BENEFITS);
                 const resultUpdate = await benefitCollection.updateMany({landing_template_id:new ObjectId(String(landing_template_id))},{
                     $set:{
                         landing_template_id:""
                     }
                 });
                 console.log('Updated documents:', resultUpdate.modifiedCount);
                if(result.deletedCount === 1){
                    res.status(201).json({message:'ok'});
                }else{
                    throw new Api500Error('Hubo un error al eliminar el landing template');
                }
            }
        }
        catch(error:any){
            errorHandler(error, res);
        }finally{
            dbClient?.close();
        }
    }
}

export default handler;