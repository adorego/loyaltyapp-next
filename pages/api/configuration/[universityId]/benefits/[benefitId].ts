import { Db, MongoClient } from 'mongodb';
import { isFileValid, saveFile } from '../../../../../helpers/FileUploadHelper';

import API400Error from '../../../../../helpers/Api400Error';
import API401Error from '../../../../../helpers/Api401Error';
import APIauthorization from '../../../../../helpers/APIauthorization';
import { Api500Error } from '../../../../../helpers/Api500Error';
import { BENEFITS } from './../../../../../helpers/collectionNames';
import { NextApiRequest } from 'next';
import { NextApiResponse } from 'next';
import { ObjectId } from 'mongodb';
import connect from '../../../../../dataBase/dataBase';
import errorHandler from '../../../../../helpers/errorHandler';
import formidable from 'formidable';
import fs from 'fs';
import { getSession } from 'next-auth/react';

export  const config = {
    api:{
        bodyParser: false
    }
};


const handler = async (req:NextApiRequest, res:NextApiResponse) =>{
    const {universityId:universitySiglaId, benefitId} = req.query;
    const session = await getSession({req:req});
    let dbClient:MongoClient| undefined;
    // console.log('Request:', req);
   
    if(req.method === 'PUT'){
        try{
            dbClient = await connect();
            const db = dbClient?.db();
            if(db && session){
                if(!APIauthorization(session, db, res, universitySiglaId, ['admin'])){
                    console.log('El usuario no esta autorizado para realizar esta consulta.');
                    throw new API401Error('El usuario no esta autorizado para realizar esta consulta.');
                }
                
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
                // dbClient?.close();
                form.parse(req, async function(err, fields, files){
                    try{
                        if(err){
                            throw new API400Error('El archivo no se puede abrir');
                        }
                        
                        const receivedFile:any = files.image;

                        const isValid = isFileValid(receivedFile);

                        if(!isValid){
                            throw new API400Error('El archivo no es valido.')
                        }
                        if( fields.id &&
                            fields.benefitPageHeader &&
                            fields.benefitExclusiveComunication &&
                            fields.benefitTitle && 
                            fields.benefitDescription && 
                            fields.benefitTerm && 
                            fields.benefitValidityFrom &&
                            fields.benefitValidityTo &&
                            fields.benefitPlaces &&
                            fields.rewardForRegistration &&
                            fields.rewardForShare){
                            const date = new Date();
                            const dateInName = date.getDate() + '-' + date.getMonth() + '-' + date.getFullYear() + '-' + date.getTime() ;
                            const fileName = 'benefitImage' + '-' + dateInName +  '.' + receivedFile.mimetype.split("/").pop();
                            await saveFile(receivedFile, path, fileName );
                            const complete_path = path + fileName;
                            const frontEndCompletePath = frontEndPath + fileName;
                            //Update Database
                            dbClient = await connect();
                            const db = dbClient?.db();
                            //Delete current Image
                            if(db){
                                removeImageFile(db, String(fields.id), res);
                            }else{
                                throw new Api500Error('Error en la conexión con la base de datos');
                            }
                            const benefitCollection = db?.collection(BENEFITS);
                            const result = await benefitCollection?.updateOne(
                                {_id:new ObjectId(String(fields.id))},
                                {
                                    $set:{
                                    image:complete_path,
                                    image_frontEnd:frontEndCompletePath,
                                    pageHeader:fields.benefitPageHeader,
                                    exclusiveComunication:fields.benefitExclusiveComunication,
                                    title:fields.benefitTitle, 
                                    description:fields.benefitDescription,
                                    term: fields.benefitTerm,
                                    validityFrom: fields.benefitValidityFrom,
                                    validityTo:fields.benefitValidityTo,
                                    places: fields.benefitPlaces,
                                    rewardForShare:fields.rewardForShare,
                                    rewardForRegistration:fields.rewardForRegistration }
                                },
                                {upsert:false});
                            if(result?.modifiedCount === 1){
                                console.log('Doc updated');
                                res.status(201).json({message:'ok'});
                            }else{
                                throw new Api500Error('No se pudo actualizar el documento');
                            }
                            
                            
                        }     
                    }catch(error:any){
                        errorHandler(error, res);
                    }finally{
                        dbClient?.close();
                    }
                    });
                }
                
                
                
                
           
        }catch(error:any){
            errorHandler(error, res);
        }

    }
    if(req.method === 'DELETE'){
        console.log('Llego al back del delete');
        try{
            dbClient = await connect();
                const db = dbClient?.db();
                if(db && session){
                    if(!APIauthorization(session, db, res, universitySiglaId, ['admin'])){
                        console.log('El usuario no esta autorizado para realizar esta consulta.');
                        throw new API401Error('El usuario no esta autorizado para realizar esta consulta.');
                    }
                    const benefitCollection = db.collection(BENEFITS);
                    const result = await benefitCollection.deleteOne({_id:new ObjectId(String(benefitId))});
                    if(result.deletedCount === 1){
                        res.status(201).json({message:'ok'});
                    }else{
                        throw new Api500Error('Hubo un error al eliminar el beneficio');
                    }
                }
        }catch(error:any){
            errorHandler(error, res);
        }
    }

}


const removeImageFile = async(db:Db, benefitId:string ,res:NextApiResponse) =>{
    try{
        console.log('File to remove');
        const benefitCollection = db.collection(BENEFITS);
        const benefit = await benefitCollection.findOne({_id:new ObjectId(String(benefitId))});
        benefit && benefit.image ? fs.unlinkSync(benefit.image) : '';
    }catch(error:any){
        errorHandler(error, res);
    }

    
}
export default handler;