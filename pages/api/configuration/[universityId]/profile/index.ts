import { NextApiRequest, NextApiResponse } from 'next';
import { UNIVERSITIES, USERS } from './../../../../../helpers/collectionNames';

import API401Error from '../../../../../helpers/Api401Error';
import APIauthorization from '../../../../../helpers/APIauthorization';
import { Api500Error } from '../../../../../helpers/Api500Error';
import {ProfileResponse} from '../../../../../data/api/profile-interface';
import connect from '../../../../../dataBase/dataBase';
import errorHandler from '../../../../../helpers/errorHandler';
import { getSession } from 'next-auth/react';

const handler = async (req:NextApiRequest, res:NextApiResponse<ProfileResponse>) =>{
    if(req.method === 'GET'){
        const {universityId:universitySigla} = req.query;
        const session = await getSession({req});
         console.log('universitySigla:', universitySigla);
        let dbClient;
        try{
            dbClient = await connect();
            const db = dbClient?.db();
            if(db && session){
                // APIauthorization(res ,universitySigla, ['admin']);
                 if(!APIauthorization(session, db, res, universitySigla, ['admin'])){
                    console.log('El usuario no esta autorizado para realizar esta consulta.');
                     throw new API401Error('El usuario no esta autorizado para realizar esta consulta.');
                }
                const universityCollection = db.collection(UNIVERSITIES);
                const userCollection = db.collection(USERS);
                const university = await universityCollection.findOne({sigla:universitySigla});
                const user = await userCollection.findOne({email:session?.user?.email});
                console.log('UniversityName:', university.name);
                res.status(200).json({
                    universityName: university?.name,
                    rol:user?.admin ? 'admin' : '',
                    email:user?.email
                    
                }) 

            }else{
                throw new Api500Error('Sin autorización para ejecutar la consulta')
            }

        }catch(error:any){
            errorHandler(error, res);

        }finally{
            dbClient?.close();

        }
        
    }

}

export default handler;