import { REWARD, UNIVERSITIES } from './../../../../../helpers/collectionNames';

import { API400Error } from './../../../../../helpers/Api400Error';
import API401Error from '../../../../../helpers/Api401Error';
import APIauthorization from '../../../../../helpers/APIauthorization';
import { Api404Error } from './../../../../../helpers/Api404Error';
import { Api500Error } from './../../../../../helpers/Api500Error';
import { MongoClient } from 'mongodb';
import { NextApiRequest } from 'next';
import { NextApiResponse } from 'next';
import { ObjectId } from 'mongodb';
import connect from '../../../../../dataBase/dataBase';
import errorHandler from '../../../../../helpers/errorHandler';
import { getSession } from 'next-auth/react';

const handler = async(req:NextApiRequest, res:NextApiResponse) =>{
    const {universityId:universitySiglaId, rewardId} = req.query;
    const session = await getSession({req:req});

    if(req.method === 'DELETE'){
        
        let dbClient:MongoClient| undefined;
        try{
            if(!universitySiglaId || !rewardId){
                throw new API400Error('Faltan parametros para la consulta');
            }
            dbClient = await connect();
            const db = dbClient?.db();
            if(db && session){
                if(!APIauthorization(session, db, res, universitySiglaId, ['admin'])){
                    console.log('El usuario no esta autorizado para realizar esta consulta.');
                    throw new API401Error('El usuario no esta autorizado para realizar esta consulta.');
                }
                const rewardCollection = db.collection(REWARD);
                const result = await rewardCollection.deleteOne({_id:new ObjectId(String(rewardId))});
                if(result.deletedCount === 1){
                    res.status(204);
                }else{
                    throw new Api404Error('No se encontró el Premio solicitado');
                }

            }
        }
        catch(error:any){
            errorHandler(error, res);
        }
        
    }
    if(req.method === 'GET'){
        let dbClient:MongoClient| undefined;
        try{
            if(!universitySiglaId || !rewardId){
                throw new API400Error('Faltan parametros para la consulta');
            }
            dbClient = await connect();
            const db = dbClient?.db();
            if(db && session){
                if(!APIauthorization(session, db, res, universitySiglaId, ['admin'])){
                    console.log('El usuario no esta autorizado para realizar esta consulta.');
                    throw new API401Error('El usuario no esta autorizado para realizar esta consulta.');
                }
                const rewardCollection = db.collection(REWARD);
                const reward = await rewardCollection.findOne({_id:rewardId});
                if(reward){
                    res.status(200).json(reward);
                }else{
                    throw new Api404Error('No se encontró el Premio solicitado')
                }
            }
        }
        catch(error:any){
            errorHandler(error, res);
        }

    }
}

export default handler;