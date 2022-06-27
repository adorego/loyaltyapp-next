import { BENEFITS, LANDING_TEMPLATES, UNIVERSITIES } from './../../../../../helpers/collectionNames';

import API400Error from '../../../../../helpers/Api400Error';
import API401Error from '../../../../../helpers/Api401Error';
import APIauthorization from '../../../../../helpers/APIauthorization';
import { Api500Error } from '../../../../../helpers/Api500Error';
import { MongoClient } from 'mongodb';
import { NextApiRequest } from 'next';
import { NextApiResponse } from 'next';
import { ObjectId } from 'mongodb';
import connect from '../../../../../dataBase/dataBase';
import errorHandler from '../../../../../helpers/errorHandler';
import formidable from 'formidable';
import fs from "fs";
import { getSession } from 'next-auth/react';
import { isFileValid } from '../../../../../helpers/FileUploadHelper';
import { saveFile } from './../../../../../helpers/FileUploadHelper';
import sizeOf from 'image-size';

export  const config = {
    api:{
        bodyParser: false,
        externalResolver:true
    }
};

const handler = async (req: NextApiRequest, res:NextApiResponse) =>{
    if(req.method === 'GET'){
        

    }
    if(req.method === 'POST'){
        const {universityId:universitySiglaId} = req.query;

        const path = `./public/${universitySiglaId}/`;
        const frontEndPath = path.slice('./public'.length,);
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
                
                if(!fs.existsSync(path)){
                            // console.log('No existe la carpeta.');
                            try{
                                fs.mkdirSync(path);
                            }catch(error:any){
                                throw new Api500Error('Error al guardar el archivo en el servidor!.');
                            }
                }
                const form = new formidable.IncomingForm({uploadDir:path}); 
                form.parse(req, async function(err, fields, files){
                try{
                        // console.log("fields:", fields, "files:", files);
                        
                        if(err){
                                throw new API400Error('Error al procesar la petición:', err);
                        }
                        
                        const numberOfSections = fields.numberOfSections;
                        let benefitId = undefined;
                        if(fields.benefitId){
                            benefitId = fields.benefitId;
                        }
                            /*landing_template Object, estructure of monngodb document{
                                template_name:string,
                                numberOfSections:number,
                                section1_id:number,
                                section1_title:string,
                                section1.oneTextOnly:boolean,
                                text1:string,
                                text2:string,
                                text3:string,
                                text4:string,
                                imageLength:number,
                                image1:url,
                                image1_frontEnd_url:url,
                                image2:url,
                                image2_fronEnd_url:url,
                                image3:url,
                                image3_fronEnd_url:url,
                                image4:url,
                                image4_fronEnd_url:url,


                            }*/
                            
                            type image_paths = {
                                url:string;
                                frontEnd_url:string;
                                image_width:number;
                                image_height:number;

                                
                            }
                            let landing_template:{[k:string]:any} = {};
                            const date = new Date();
                            const dateInName = date.getDate() + '-' + date.getMonth() + '-' + date.getFullYear() + '-' + date.getTime() ;
                            landing_template.template_name = `${universitySiglaId}-${dateInName}`;
                            landing_template.numberOfSections = numberOfSections;
                            
                            
                            for(let i=1; i < Number(numberOfSections)+1; i++){
                                if(!fields[`id-Section{i}`] || !fields[`title-Section${i}`] || !fields[`oneTextOnly-Section${i}`] || !fields[`imagesLength-Section${i}`] )
                                { 
                                        const numberOfImages = fields[`imagesLength-Section${i}`];
                                        const images_url:Array<image_paths> = [];
                                        for(let j=0; j < Number(numberOfImages); j++){
                                                 const file = files[`image-Section${i}-${j+1}`];
                                                 const isValid = isFileValid(file);
                                                 if(!isValid){
                                                     throw new API400Error('Un archivo enviado no es valido.')
                                                 }
                                                //  console.log('File:', file);
                                                 const fileName = `image${j+1}-Section${i}-${dateInName}.${file.mimetype.split("/").pop()}`;
                                                //  console.log('fileName:', fileName);
                                                 saveFile(file, path, fileName);
                                                 const complete_path = path + fileName;
                                                 const frontEndCompletePath = frontEndPath + fileName;
                                                 const dimension = sizeOf(complete_path);
                                                 images_url.push({url:complete_path, frontEnd_url:frontEndCompletePath, 
                                                    image_width: Number(dimension.width),image_height:Number(dimension.height)});
                                            



                                        }
                                        
                                            landing_template[`section${i}_id`] = fields[`id-Section${i}`];
                                            landing_template[`section${i}_title`] = fields[`title-Section${i}`];
                                            landing_template[`section${i}_oneTextOnly`] = fields[`oneTextOnly-Section${i}`];
                                            landing_template[`section${i}_imagesLength`] = fields[`imagesLength-Section${i}`];
                                            console.log('images_url.length:', images_url.length);
                                            for(let j=0; j < images_url.length; j++){
                                                    landing_template[`section${i}_image${j+1}_url`] = images_url[j].url;
                                                    landing_template[`section${i}_image${j+1}_frontEnd_url`] = images_url[j].frontEnd_url;
                                                    landing_template[`section${i}_image${j+1}_image_width`] = images_url[j].image_width;
                                                    landing_template[`section${i}_image${j+1}_image_height`] = images_url[j].image_height;
                                                    
                                                    if(j === 0){
                                                            landing_template[`section${i}_text1`] = fields[`text-Section${i}-1`];
                                                     }
                                                    
                                                    const expression = JSON.parse(String(fields[`oneTextOnly-Section${i}`]));
                                                    
                                                    if( !expression && (j > 0)){
                                                        console.log(`i:${i}, j:${j}`);
                                                        landing_template[`section${i}_text${j+1}`] = fields[`text-Section${i}-${j+1}`]
                                                    }
                                                 
                                            }
                                            const universityCollection = db.collection(UNIVERSITIES);
                                            const university = await universityCollection.findOne({sigla:universitySiglaId});
                                            landing_template['university_id'] = university?._id;
                                            
                                        

                                }
                                
                                

                            }
                            // console.log("landing_template:", landing_template);
                            const landing_templatesCollection = db.collection(LANDING_TEMPLATES);
                            const insertResult = await landing_templatesCollection.insertOne(
                                landing_template
                            );
                            console.log('insertResult:', insertResult);

                            if(insertResult.insertedId){
                                if(benefitId){
                                    console.log('Ingreso en la sección con benefitId, benefitId:', benefitId);
                                    const benefitCollection = db.collection(BENEFITS);
                                    const result = await benefitCollection.updateOne(
                                        {_id:new ObjectId(String(benefitId))},
                                        {
                                        $set:{
                                            landing_template_id:insertResult.insertedId
                                        }},
                                        {upsert:false}
                                    );
                                    if(result.modifiedCount === 1){
                                        res.status(201).json({
                                            id:insertResult.insertedId
                                        })
                                    }else{
                                        throw new Api500Error('Hubo un error al actualizar los datos')
                                    }
                                }else{
                                    console.log('Ingreso en la sección sin benefitId');
                                    res.status(201.).json({message:'ok'});
                                }
                            }else{
                                throw new Api500Error('Hubo un error al actualizar los datos')
                            }
                            
                            
                            

                            
                    }catch(error:any){
                            errorHandler(error, res);
                    }finally{
                        dbClient?.close();
                    }
                })
            }
        }
        catch(error:any){
                errorHandler(error, res);
        }
            
    }
}



export default handler;