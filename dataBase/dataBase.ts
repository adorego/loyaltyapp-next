import { API400Error } from './../helpers/Api400Error';
import { Api500Error } from './../helpers/Api500Error';
import {MongoClient} from 'mongodb'

//const db_uri = 'mongodb+srv://loyaltyapp_user:camila2000@cluster0.bnes2.mongodb.net/loyaltyapp?retryWrites=true&w=majority'
const db_uri = 'mongodb://loyaltyapp_user:camila2000@localhost:27017/loyaltyapp?retryWrites=true&w=majority';

export default async function connect(){
    if(db_uri){
        let client = new MongoClient(db_uri);
        try{
            const response = await client.connect();
            console.log("response:", response);
            return client;

        }catch(Error){
            console.log('Error while connecting to DataBase!');
            throw new Api500Error('Error al conectar con la Base de Datos');
        }
    }
}

