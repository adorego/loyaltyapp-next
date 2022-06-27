import BaseError from './baseError';
import { NextApiResponse } from 'next';
import { ServerResponse } from 'http';

const errorHandler = (err:any, res:NextApiResponse) =>{
    if(typeof(err) === typeof(BaseError)){
        
            return res.status(err.statusCode).json({message:err.name});
        
    }

    if(err.name ? err.name === 'UnauthorizedError' : ''){
        return res.status(401).json({message: 'No tiene authorización'});
    }

    console.error(err);
    return res.status(500).json({message: err.name});

}

export const errorNextHandler = (err:any, res:ServerResponse) =>{
    res.statusCode = 404;
    return{
        props:{
            error: true,
            errorCode:404,
            errorDescription:err.message
        }
    }
}

export default errorHandler;