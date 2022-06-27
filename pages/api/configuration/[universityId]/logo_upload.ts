import * as collections from "../../../../helpers/collectionNames";

import type { NextApiRequest, NextApiResponse } from 'next';
import { isFileValid, saveFile } from "../../../../helpers/FileUploadHelper";

import { API400Error } from './../../../../helpers/Api400Error';
import { Api500Error } from './../../../../helpers/Api500Error';
import BaseError from '../../../../helpers/baseError';
import { MongoClient } from 'mongodb';
import connect from "../../../../dataBase/dataBase";
import errorHandler from "../../../../helpers/errorHandler";
import formidable from "formidable";
import fs from "fs";
import sizeof from 'image-size'

export  const config = {
    api:{
        bodyParser: false,
        externalResolver:true
    }
};

const handler = async (req:NextApiRequest, res:NextApiResponse) => {
    const {universityId} = req.query;
   
    if(req.method === 'POST'){
        let dbClient:MongoClient| undefined;
        try {
        
            const path = `./public/${universityId}/`;
            const frontEndPath = path.slice('./public'.length,);
           
            if(!fs.existsSync(path)){
                    // console.log('No existe la carpeta.');
                    try{
                        fs.mkdirSync(path);
                    }catch(error:any){
                        throw new Api500Error('Error al guardar el archivo en el servidor!.');
                    }
            }
            const form = new formidable.IncomingForm({uploadDir:path});
            // console.log("form:", form);
            
           
             
            form.parse(req, async function(err, fields, files){
                try{
                    if(err){
                        throw new API400Error('El archivo no se puede abrir');
                    }
                    
                    
                    const receivedFile = files.file;
                    

                    const isValid = isFileValid(receivedFile);
                    // console.log('isValid:', isValid);
                    if (!isValid) {
                        console.log('La extension del archivo no es valida');
                        throw new API400Error('El archivo no tiene una extensión válida');
                    }
                    // console.log("file:", receivedFile);
                
                    const fileName = 'logo.'+ receivedFile.mimetype.split("/").pop();
                    
                    saveFile(receivedFile, path, fileName);
                    const completePath = path  + fileName;
                    const frontEndCompletePath = frontEndPath + fileName;
                    const dimensions = sizeof(completePath);
                    // //Save into DataBase
                    dbClient = await connect();
                    const db = dbClient?.db();
                    const universityCollection =  db?.collection(collections.UNIVERSITIES);
                    
                    const filter = {sigla:universityId};
                    const options = {upsert:false};
                    const updateDoc = {
                        $set:{
                            logo:completePath,
                            frontEndCompletePath,
                            logo_width:dimensions.width,
                            logo_height:dimensions.height
                        }
                    }
                    const result = await universityCollection?.updateOne(filter, updateDoc, options);
                    if(result?.modifiedCount === 1){
                        res.status(201).json({frontEndCompletePath:frontEndCompletePath, logo:completePath});
                    }else{
                        throw new Api500Error('Error al guardar el logo en el servidor');
                    }
                }catch(error:any){
                    errorHandler(error, res);
                }
            });
            
            
        }
        catch(error:any){
            errorHandler(error, res);
        }finally{
            console.log('Antes de cerrar la conexión');
            await dbClient?.close()
        }
    }
}





export default handler;

