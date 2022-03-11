import {MongoClient} from 'mongodb'

//const db_uri = 'mongodb+srv://loyaltyapp_user:camila2000@cluster0.bnes2.mongodb.net/loyaltyapp?retryWrites=true&w=majority'
const db_uri = 'mongodb://loyaltyapp_user:camila2000@localhost:27017/loyaltyapp?retryWrites=true&w=majority';

export default async function connect(){
    if(db_uri){
        const client = new MongoClient(db_uri);
        try{
            await client.connect();
            return client;

        }catch(Error){
            console.log('Error while connecting to DataBase!');
        }
    }
}

