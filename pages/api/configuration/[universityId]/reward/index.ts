import * as collections from "../../../../../helpers/collectionNames";

import { MongoClient, ObjectId } from 'mongodb';
import { NextApiRequest, NextApiResponse } from 'next';
import {isFileValid, saveFile} from '../../../../../helpers/FileUploadHelper';

import API400Error from '../../../../../helpers/Api400Error';
import { Api500Error } from '../../../../../helpers/Api500Error';
import BaseError from '../../../../../helpers/baseError';
import { PremiosType } from './../../../../../data/Configuration/Premio-interface';
import {REWARD} from '../../../../../helpers/collectionNames';
import { UNIVERSITIES } from './../../../../../helpers/collectionNames';
import connect from '../../../../../dataBase/dataBase';
import errorHandler from "../../../../../helpers/errorHandler";
import formidable from "formidable";
import fs from "fs";
import sizeOf from 'image-size';

export  const config = {
    api:{
        bodyParser: false
    }
};


const handler = async (req:NextApiRequest, res:NextApiResponse) =>{
    const {universityId} = req.query;
    if(req.method === 'GET'){
        if(!universityId){
            throw new API400Error('Parametros incorrectos¡');
        }
        const dbClient = await connect();
        try{
            
            const db = dbClient?.db();
            if(db){
                const rewardCollection = db.collection(REWARD);
                const universityCollection = db.collection(UNIVERSITIES);
                const universityDocument = await universityCollection.findOne({sigla:universityId});

                const rewardsArray =  await rewardCollection.find({university_id: universityDocument?._id}).toArray();
                console.log('rewardsArray:', rewardsArray);
                res.status(200).json(rewardsArray);

            }

        }catch(error:any){
           
            if(typeof error === typeof BaseError){
                res.status(error.statusCode).json(error);
            }else{
                res.status(500).json(error);
            }
        }finally{
            console.log('Se ejecutara close');
            dbClient?.close();
        }

    }
    if(req.method === 'POST'){
        
        let dbClient:MongoClient| undefined;
        try{
            const path = `./public/${universityId}/`;
            const frontEndPath = path.slice('./public'.length,);
           
            if(!fs.existsSync(path)){
                    console.log('No existe la carpeta.');
                    try{
                        fs.mkdirSync(path);
                    }catch(error:any){
                        throw new Api500Error('Error al guardar el archivo en el servidor!.');
                    }
            }
            
            const form = new formidable.IncomingForm({uploadDir:path, keepExtensions:true});
            // console.log('form:', form);
            form.parse(req, async function(err, fields, files){
                if(err){
                    throw new API400Error('El archivo no se puede abrir');
                }
                 
                const receivedFile:any = files.image;
                
                const isValid = isFileValid(receivedFile);

                if(!isValid){
                    throw new API400Error('El archivo no es valido.')
                }
                
                if(fields.title && fields.description && fields.premioType && fields.monto && fields.equivalente_puntos){
                    
                    const date = new Date();
                    const fileName = 'rewardImage' + date.getTime() + '.' + receivedFile.mimetype.split("/").pop();
                    await saveFile(receivedFile, path, fileName );
                    const complete_path = path + fileName;
                    const frontEndCompletePath = frontEndPath + fileName;
                    //Save to Database
                    dbClient = await connect();
                    const db = dbClient?.db();
                    const universityCollection = db?.collection(collections.UNIVERSITIES);
                    const university = await universityCollection?.findOne({sigla:universityId});
                    console.log('university:', university);
                    const rewardCollection = db?.collection(collections.REWARD);
                    const dimensions = sizeOf(complete_path);
                    rewardCollection?.createIndex({premioType:1, monto:1},{unique:true});
                    const insertResult = await rewardCollection?.insertOne({
                        university_id:university?._id,
                        image:complete_path,
                        image_frontEnd:frontEndCompletePath,
                        image_width:dimensions.width,
                        image_height:dimensions.height,
                        title:fields.title, 
                        description:fields.description,
                        premioType: fields.premioType,
                        monto: fields.monto,
                        equivalente_puntos: fields.equivalente_puntos
                    
                    });
                    if(insertResult?.insertedId){
                        res.status(201);
                    }else{
                        throw new Api500Error('No se pudo crear el Premio');
                    }
                }
            });
        
        }catch(error:any){
                errorHandler(error, res);
        }finally{
              dbClient?.close();  
        }
    }
}

export default handler;