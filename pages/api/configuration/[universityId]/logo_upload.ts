import * as collections from "../../../../helpers/collectionNames";

import type { NextApiRequest, NextApiResponse } from 'next';

import { API400Error } from './../../../../helpers/Api400Error';
import { Api500Error } from './../../../../helpers/Api500Error';
import BaseError from '../../../../helpers/baseError';
import { MongoClient } from 'mongodb';
import connect from "../../../../dataBase/dataBase";
import formidable from "formidable";
import fs from "fs";
import path from 'path';

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
                if(err){
                    throw new API400Error('El archivo no se puede abrir');
                }
                 
                
                const receivedFile:any = files.file;

                const isValid = isFileValid(receivedFile);
                if (!isValid) {
                    // throes error if file isn't valid
                    throw new API400Error('El archivo no es un archivo valido');
                }
                // console.log("file:", receivedFile);
               
                const fileName = 'logo.'+ receivedFile.mimetype.split("/").pop();
                saveFile(receivedFile, path, fileName);
                const completePath = path  + fileName;
                const frontEndCompletePath = frontEndPath + fileName;
                
                // //Save into DataBase
                dbClient = await connect();
                const db = dbClient?.db();
                const universityCollection =  db?.collection(collections.UNIVERSITIES);
                
                const filter = {sigla:universityId};
                const options = {upsert:false};
                const updateDoc = {
                    $set:{
                        logo:completePath,
                        frontEndCompletePath
                    }
                }
                const result = await universityCollection?.updateOne(filter, updateDoc, options);
                
                res.status(201).json({frontEndCompletePath:frontEndCompletePath});
            });
            
            
        }
        catch(error:any){
                console.log('Ocurrió un error, se envia al cliente');
                if(typeof error === typeof BaseError){
                    res.status(error.statusCode).json(error);
                }else{
                    res.status(500).json(error);
                }
        }finally{
            await dbClient?.close()
        }
    }
}

const isFileValid = (file:any) =>{
    const type = file.mimetype.split("/").pop();
    const validType = ["jpg", "jpeg", "png", "pdf"];
    if(validType.indexOf(type) === -1){
        return false;
    }
    return true;
}

const saveFile =  async (file:any, path:string, fileName:string) =>{
    const data = fs.readFileSync(file.filepath);
    const folderName = path;
    try{
        if(!fs.existsSync(folderName)){
            console.log('No existe la carpeta.');
            fs.mkdirSync(folderName);
        }
    }catch(error){
        throw new Api500Error('Error al guardar el archivo en el servidor!.');
    }
    fs.writeFileSync(`${folderName}/${fileName}`, data, {flag: 'a+'});
    fs.unlinkSync(file.filepath);
    

}

export default handler;

