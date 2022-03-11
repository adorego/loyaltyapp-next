import * as collectionNames from "../../../helpers/collectionNames";

import { Api404Error } from './../../../helpers/Api404Error';
import NextAuth from 'next-auth';
import Provider from 'next-auth/providers';
import UniversityCollectionInterface from '../../../dataBase/UniversityCollectionInterface';
import connect from "../../../dataBase/dataBase";
import { session } from './../../../node_modules/next-auth/client.d';
import {verify_password} from "../../../helpers/auth";

export default NextAuth({
    providers: [
        Provider.Credentials({
            credentials:{
                email: {label: "email", type: "text", placeholder: "jose@gmail.com"},
                password:{label: "Clave", type: "password"}
            },
            async authorize(credentials){
                const client = await connect();

                const userCollection = client?.db().collection(collectionNames.USERS);

                const user = await userCollection?.findOne({email: credentials.email});
                
                if(!user){
                    client?.close();
                    throw new Api404Error('No existe el usuario/clave');
                }

                const valid = await verify_password(credentials.password, user.hash);

                if(!valid){
                    client?.close();
                    throw new Api404Error('Error en las credenciales');
                }

                client?.close();
                return {
                    email: user.email,
                        
                    }
                


                

            }
        
        
        })
    ]
});