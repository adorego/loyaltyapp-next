//api/register
import * as collections from "../../../helpers/collectionNames";

import { NextApiRequest, NextApiResponse } from 'next';

import API400Error from '../../../helpers/Api400Error';
import {MongoClient} from 'mongodb'
import bcrypt from 'bcrypt';
import transport from "../../../helpers/emailSMTP";

//const db_uri = 'mongodb+srv://loyaltyapp_user:camila2000@cluster0.bnes2.mongodb.net/loyaltyapp?retryWrites=true&w=majority'
const db_uri = 'mongodb://loyaltyapp_user:camila2000@localhost:27017/loyaltyapp?retryWrites=true&w=majority';


const  handler = async (req:NextApiRequest, res:NextApiResponse) =>{
    
    if(req.method == 'POST'){
        const client = new MongoClient(db_uri);
        try{
            
            const data = JSON.parse(req.body);
            const {universityName, sigla ,email, password} = data;
            // console.log("Received data:", data);
            if(!universityName  || !email || !password){
                throw new API400Error('Faltan datos para realizar el registro');
            }
           
            await client.connect();
            const db = client.db();
            const normalize_name = universityName.normalize('NFD').replace(/[\u0300-\u036f]/g, "");
            const universityCollection = db.collection(collections.UNIVERSITIES);
            universityCollection.createIndex({normalize_name:1, sigla:1},{unique:true});
            const userCollection = db.collection(collections.USERS);
            userCollection.createIndex({email:1},{unique:true});
            
            // const verificationCodeCollection = db.collection('verification_code');
            
            const hash = await hashPassword(password);
            // console.log('name_uri:', sigla, "hashedPassword:", hash);
            
            if(await universityCollection.find({normalize_name:normalize_name}).hasNext()){
                throw new API400Error('Esta universidad ya está registrada');
            }
            if(await userCollection.find({email:email}).hasNext()){
                throw new API400Error('Este correo ya está registrado');
            }
            const insertUniversityResult = await universityCollection.insertOne({
                normalize_name:normalize_name,
                name:universityName,
                logo:"",
                configured:false,
                sigla});

            const insertUserResult = await userCollection.insertOne({
                email, 
                hash:hash, 
                university_id:insertUniversityResult.insertedId, 
                admin:true,
                verified:false
            });
            const verification_code = generate_verification_code();
            // sendVerificationEmail(email, verification_code);
            const insertedUniversity = await universityCollection.findOne({_id:insertUniversityResult.insertedId});
            const insertedUser = await userCollection.findOne({_id:insertUserResult.insertedId});
            res.status(201).json({message:"Operación exitosa!", data:{
                university:{
                    ...insertedUniversity
                },
                user:{
                    ...insertedUser,
                    verification_code:verification_code
                }
            }});
            

        }
        catch(error:any){
            console.log("Error while registering user", error);
            res.status(400).json(error);
        }
        finally{
            await client.close();
        }
            
    }
    
    

}
const sendVerificationEmail = (email:string, code:string) =>{
    const mailOptions = {
        from: 'info@loyaltyapp.com.py', // Sender address
        to: 'adoregoel@gmail.com', // List of recipients
        subject: 'Código de verificación', // Subject line
        html: `<h2 style="color:#ff6600;">Su código de verificación es:<span style="color:#FF0000">${code}</span></h2>`
              
        
    };
    transport.sendMail(mailOptions, function(err, info) {
        if (err) {
          console.log(err)
        } else {
          console.log(info);
        }
     });
}

async function hashPassword(password:string):Promise<string>{
    const saltRound = 10;
    const salt = await bcrypt.genSalt(saltRound);
    const hash = await bcrypt.hash(password, salt);
    return hash;
}


function generate_verification_code():string{
    let final_string = '';
    for(let i=0; i<6; i++){
        final_string = final_string.concat(String(Math.floor(Math.random() * 10)));
    }
    return final_string;
}
export default handler;