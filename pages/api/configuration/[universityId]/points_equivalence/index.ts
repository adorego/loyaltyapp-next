import { NextApiRequest, NextApiResponse } from 'next';

import API400Error from '../../../../../helpers/Api400Error';
import { API401Error } from '../../../../../helpers/Api401Error';
import APIauthorization from '../../../../../helpers/APIauthorization';
import BaseError from '../../../../../helpers/baseError';
import {CONFIGURATION} from '../../../../../helpers/collectionNames';
import { MongoClient } from 'mongodb';
import { UNIVERSITIES } from './../../../../../helpers/collectionNames';
import connect from '../../../../../dataBase/dataBase';
import { getSession } from 'next-auth/react';

const handler = async (req:NextApiRequest, res:NextApiResponse) =>{
    const {universityId:universitySiglaId} = req.query;
    const session = await getSession({req:req});
    let dbClient:MongoClient| undefined;
    
    try{
                
        dbClient = await connect();
        const db = dbClient?.db();
    
        if(db && session){
            if(!APIauthorization(session, db, res, universitySiglaId, ['admin'])){
                console.log('El usuario no esta autorizado para realizar esta consulta.');
                throw new API401Error('El usuario no esta autorizado para realizar esta consulta.');
            }
            if(req.method === 'GET'){
                const configurationCollection = db?.collection(CONFIGURATION);
                const universityCollection = db?.collection(UNIVERSITIES);
                const universityDocument = await universityCollection.findOne({sigla:universitySiglaId});
                const configuration = await configurationCollection.findOne({university_id:universityDocument?._id});
                
                if(configuration){

                    res.status(200).json({points:configuration.points, money:configuration.money, id:configuration._id});
                }else{
                   
                    res.status(200).json({points:"", money:"", id:""});
                }
                
            }
            if(req.method === 'POST'){
                const data = JSON.parse(req.body);
                const {points, money} = data;
                if(!points  || !money){
                    throw new API400Error('Faltan datos para realizar la inserción de datos.');
                }
                const configurationColection = db.collection(CONFIGURATION);
                const universityCollection = db.collection(UNIVERSITIES);
                const universityDocument = await universityCollection.findOne({sigla:universitySiglaId});
                const insertedResult = await configurationColection.insertOne({
                    university_id:universityDocument?._id,
                    points:points,
                    money:money
                });
                const insertedConfiguration = await configurationColection.findOne({_id:insertedResult.insertedId});
                res.status(201).json(insertedConfiguration);

            }
            
                
            
                
        }
    }catch(error:any){
        console.log('Ocurrió un error, se envia al cliente');
        if(typeof error === typeof BaseError){
            res.status(error.statusCode).json(error);
        }else{
            res.status(500).json(error);
        }

    }finally{
        dbClient?.close();
    }      
   
}

export default handler;