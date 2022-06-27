import {UNIVERSITIES, USERS} from "./collectionNames";

import { Db } from "mongodb";
import { NextApiResponse } from "next";
import { Session } from "next-auth";
import connect from '../dataBase/dataBase';
import errorHandler from "./errorHandler";
import { getSession } from 'next-auth/react';

const APIauthorization = async (session:Session, db:Db ,res:NextApiResponse ,universitySiglaId:string|string[],role:string[]) =>{
    let dbClient;
    try{
        // dbClient = await connect();
        const userCollection = db.collection(USERS);
        const universityCollection = db.collection(UNIVERSITIES);
        const user = await userCollection?.findOne({email:session?.user?.email});
        const university = await universityCollection?.findOne({sigla:universitySiglaId});
        if(user === null || university === null || user?.university_id !== university?._id ||  role.indexOf(user?.role) < 0){
             return false;
        }
        return true;
        
    }catch(err:any){
        errorHandler(err, res );
    }finally{
        // dbClient?.close();
    }
}

export default APIauthorization;