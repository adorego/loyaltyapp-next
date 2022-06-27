import { NextApiRequest, NextApiResponse } from 'next/dist/shared/lib/utils';

import {SMTPClient} from 'emailjs';
import errorHandler from '../../helpers/errorHandler';

async function handler(req:NextApiRequest, res:NextApiResponse){
    
    const email = req.body.email;
    const content = req.body.content;
    const subject = req.body.subject;
    
    if(req.method === 'POST'){
        try{
            const client = new SMTPClient({
                user: process.env.MAIL_ACCOUNT,
                password: process.env.MAIL_ACCOUNT_PASSWORD,
                host: 'smtp.gmail.com',
                ssl:true
            });
            const message = await client.sendAsync(
                {
                    text:content,
                    from: String(process.env.MAIL_ACCOUNT),
                    to: email,
                    subject:subject
                }
            )
            res.status(201).json(`message:${message}`);
        }catch(error:any){
            console.log("Ocurrió un error");
            errorHandler(error, res);
        }
    }
}

export default handler;