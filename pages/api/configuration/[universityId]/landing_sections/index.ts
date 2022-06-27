import { NextApiRequest, NextApiResponse } from "next";

import API400Error from '../../../../../helpers/Api400Error';
import API401Error from '../../../../../helpers/Api401Error';
import APIauthorization from '../../../../../helpers/APIauthorization';
import { Api500Error } from '../../../../../helpers/Api500Error';
import BaseError from '../../../../../helpers/baseError';
import { MongoClient } from "mongodb";
import connect from '../../../../../dataBase/dataBase';
import formidable from 'formidable';
import fs from "fs";
import { getSession } from 'next-auth/react';
import { isFileValid } from '../../../../../helpers/FileUploadHelper';

export  const config = {
    api:{
        bodyParser: false
    }
};


const handler = async (req:NextApiRequest, res:NextApiResponse) =>{
    const {universityId} = req.query;
    const session = await getSession();
    const dbClient:MongoClient| undefined = await connect()
    
    if(req.method == 'POST'){
        try{
            const db = dbClient?.db();
            if(db && session){
                if(!APIauthorization(session,db, res,universityId, ['admin'])){
                    console.log('El usuario no esta autorizado para realizar esta consulta.');
                    throw new API401Error('El usuario no esta autorizado para realizar esta consulta.');
                }
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
                    console.log("Fields:", fields);
                    console.log("Files:", files);
                    // const receivedFile:any = files.image;
                    
                    // const isValid = isFileValid(receivedFile);

                    // if(!isValid){
                    //     throw new API400Error('El archivo no es valido.')
                    // }
                    res.status(200).json({message:"ok"});
                })
            }
            

        }catch(error:any){
            if(typeof error === typeof BaseError){
                res.status(error.statusCode).json(error);
            }else{
                res.status(500).json(error);
            }
        }finally{
            dbClient?.close();
        }

    }

}

export default handler;