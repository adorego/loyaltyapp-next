import * as collections from "../../../../helpers/collectionNames";

import { NextApiRequest, NextApiResponse } from 'next';
import { isFileValid, saveFile } from '../../../../helpers/FileUploadHelper';

import { API400Error } from './../../../../helpers/Api400Error';
import { Api404Error } from './../../../../helpers/Api404Error';
import { Api500Error } from '../../../../helpers/Api500Error';
import BaseError from '../../../../helpers/baseError';
import { MongoClient } from 'mongodb';
import connect from '../../../../dataBase/dataBase';
import formidable from 'formidable';
import fs from 'fs';
import {getSession} from 'next-auth/client';

export  const config = {
    api:{
        bodyParser: false
    }
};


const handler = async (req:NextApiRequest, res:NextApiResponse) =>{
    const {universityId} = req.query;
    const session = await getSession({req:req});
    let dbClient:MongoClient| undefined;
    
    try{
        if(!session){
            throw new API400Error('El usuario no esta authenticado!');
        }
        dbClient = await connect();
        const db = dbClient?.db();
        const userCollection =  db?.collection(collections.USERS);
        const universityCollection =  db?.collection(collections.UNIVERSITIES);

        const university = await universityCollection?.findOne({sigla:universityId});
        const user = await userCollection?.findOne({email:session.user?.email, university_id:university?._id});
        if(!user){
            throw new Api404Error('El usuario no tiene acceso');
        }

        if(req.method === 'POST'){
            const {universityId} = req.query;
            const path = `./public/${universityId}/`;
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
                if(err){
                    throw new API400Error('El archivo no se puede abrir');
                }
                console.log("Fields, files", fields, files);
                const receivedFile:any = files.image;

                const isValid = isFileValid(receivedFile);

                if(!isValid){
                    throw new API400Error('El archivo no es valido.')
                }

                if(fields.benefitTitle && fields.benefitDescription && fields.benefitTerm && fields.benefitPlaces){
                    const date = new Date();
                    const fileName = 'benefitImage' + '.' + receivedFile.mimetype.split("/").pop();
                    await saveFile(receivedFile, path, fileName );
                    const complete_path = path + fileName;
                    const frontEndCompletePath = frontEndPath + fileName;
                    //Save to Database
                    dbClient = await connect();
                    const db = dbClient?.db();
                    const universityCollection = db?.collection(collections.UNIVERSITIES);
                    const university = await universityCollection?.findOne({sigla:universityId});
                    // console.log('University:', university);
                    const benefitCollection = db?.collection(collections.BENEFITS);
                    const insertResult = await benefitCollection?.insertOne({
                        university_id:university?._id,
                        image:complete_path,
                        image_frontEnd:frontEndCompletePath,
                        title:fields.benefitTitle, 
                        description:fields.benefitDescription,
                        term: fields.benefitTerm,
                        places: fields.benefitPlaces});
                    
                    res.status(201).json({message:'ok', benefit_id:insertResult?.insertedId});

                }
            });
        }
        if(req.method === 'GET'){
            const benefitCollection = db?.collection(collections.BENEFITS);
            const universityCollection = db?.collection(collections.UNIVERSITIES);
            const university = await universityCollection?.findOne({sigla:universityId});
            console.log('University:', university, university?._id);
            const benefitsArray = await benefitCollection?.find({university_id:university?._id}).toArray();
            console.log("benefitsArray:", benefitsArray);
            res.status(200).json(benefitsArray);

        }







    }catch(error:any){
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

export default handler;