import * as collections from "../../../../../helpers/collectionNames";

import { NextApiRequest, NextApiResponse } from 'next';
import { isFileValid, saveFile } from '../../../../../helpers/FileUploadHelper';

import { API400Error } from '../../../../../helpers/Api400Error';
import { API401Error } from '../../../../../helpers/Api401Error';
import APIauthorization from "../../../../../helpers/APIauthorization";
import { Api404Error } from '../../../../../helpers/Api404Error';
import { Api500Error } from '../../../../../helpers/Api500Error';
import BaseError from '../../../../../helpers/baseError';
import { MongoClient } from 'mongodb';
import connect from '../../../../../dataBase/dataBase';
import errorHandler from "../../../../../helpers/errorHandler";
import formidable from 'formidable';
import fs from 'fs';
import {getSession} from 'next-auth/react';
import sizeOf from 'image-size';

export  const config = {
    api:{
        bodyParser: false
    }
};


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
            

            if(req.method === 'POST'){
                const path = `./public/${universitySiglaId}/`;
                const frontEndPath = path.slice('./public'.length,);

                if(!fs.existsSync(path)){
                    try{
                        fs.mkdirSync(path);
                    }catch(error){
                        throw new Api500Error('Error al guardar el archivo en el servidor!');
                    }
                }
                const form = new formidable.IncomingForm({uploadDir:path});

                form.parse(req, async function(err, fields, files){
                    try{
                    
                        if(err){
                            throw new API400Error('El archivo no se puede abrir');
                        }
                        // console.log("Fields, files", fields, files);
                        const receivedFile:any = files.image;
                        console.log("File:", receivedFile);
                        const isValid = isFileValid(receivedFile);

                        if(!isValid){
                            throw new API400Error('El formato de la imagen no es valido.')
                        }

                        if(fields.benefitPageHeader &&
                        fields.benefitExclusiveComunication &&
                        fields.benefitTitle && 
                        fields.benefitDescription){
                            const date = new Date();
                            const dateInName = date.getDate() + '-' + date.getMonth() + '-' + date.getFullYear() + '-' + date.getTime() ;
                            const fileName = 'benefitImage' + '-' + dateInName +  '.' + receivedFile.mimetype.split("/").pop();
                            await saveFile(receivedFile, path, fileName );
                            const complete_path = path + fileName;
                            const frontEndCompletePath = frontEndPath + fileName;
                            const dimensions = sizeOf(complete_path);
                            console.log('dimensions:', dimensions);
                            //Save to Database
                            dbClient = await connect();
                            const db = dbClient?.db();
                            const universityCollection = db?.collection(collections.UNIVERSITIES);
                            const university = await universityCollection?.findOne({sigla:universitySiglaId});
                            const benefitCollection = db?.collection(collections.BENEFITS);
                            const insertResult = await benefitCollection?.insertOne({
                                university_id:university?._id,
                                image:complete_path,
                                image_frontEnd:frontEndCompletePath,
                                image_width:dimensions.width,
                                image_height:dimensions.height,
                                pageHeader:fields.benefitPageHeader,
                                exclusiveComunication:fields.benefitExclusiveComunication,
                                title:fields.benefitTitle, 
                                description:fields.benefitDescription
                                });
                            
                            res.status(201).json({message:'ok', benefit_id:insertResult?.insertedId});

                        }else{
                            throw new API400Error('No se enviaron todos los parametros requeridos para esta acción');
                        }
                    }catch(error:any){
                        errorHandler(error, res);
                    }
                });
            }
            if(req.method === 'GET'){
                const benefitCollection = db?.collection(collections.BENEFITS);
                const universityCollection = db?.collection(collections.UNIVERSITIES);
                const university = await universityCollection?.findOne({sigla:universitySiglaId});
                // console.log('University:', university, university?._id);
                const benefitsArray = await benefitCollection?.find({university_id:university?._id}).toArray();
                // console.log("benefitsArray:", benefitsArray);
                res.status(200).json(benefitsArray);

            }
        }







    }catch(error:any){
        console.log('Ocurrió un error, se envia al cliente');
            if(typeof error === typeof BaseError){
                res.status(error.statusCode).json(error);
            }else{
                res.status(500).json(error);
            }
    }

        
    

}

export default handler;