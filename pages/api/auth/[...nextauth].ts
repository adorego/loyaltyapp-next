import * as collectionNames from "../../../helpers/collectionNames";

import { Api404Error } from './../../../helpers/Api404Error';
import CredentialsProvider from 'next-auth/providers/credentials';
import NextAuth from 'next-auth';
import UniversityCollectionInterface from '../../../dataBase/UniversityCollectionInterface';
import connect from "../../../dataBase/dataBase";
import errorHandler from "../../../helpers/errorHandler";
import {verify_password} from "../../../helpers/auth";

export default NextAuth({
    providers: [
        CredentialsProvider({
            name:"Credentials",
            credentials:{
                email: {label: "email", type: "text", placeholder: "jose@gmail.com"},
                password:{label: "Clave", type: "password"}
            },
            async authorize(credentials, req){
                
                    const client = await connect();

                    const userCollection = client?.db().collection(collectionNames.USERS);

                    const user = await userCollection?.findOne({email: credentials?.email});
                    
                    
                    if(!user){
                        client?.close();
                        throw new Api404Error('No existe el usuario/clave');
                    }
                    if(credentials && credentials.password){
                        const valid = await verify_password(credentials?.password, user.hash);

                        if(!valid){
                            client?.close();
                            throw new Api404Error('Error en las credenciales');
                        }
                    }

                    client?.close();
                
                
                    return {
                        id:user._id,
                        email: user.email
                        
                            
                    }
                
                


                

            }
        
        
        })
    ],
    secret : 'ZfrDa/0mUxfZSqauhJ4SZTxoI91bCOHpNrI0PydXmpc=',
    session: { strategy: "jwt" },
    jwt: {
        // The maximum age of the NextAuth.js issued JWT in seconds.
        // Defaults to `session.maxAge`.
        maxAge: 60 * 60 * 24 * 30,
        // You can define your own encode/decode functions for signing and encryption
        // async encode() {

        // },
        // async decode() {},
      }
});

