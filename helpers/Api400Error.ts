import BaseError from "./baseError";
import httpStatusCodes from "./httpStatusCodes";
export class API400Error extends  BaseError{
    constructor(name:string, 
        statusCode:number = httpStatusCodes.BAD_REQUEST ,
        description:string = 'BAD_REQUEST_ERROR',
        isOperational = true){
            super(name, statusCode, isOperational, description);
        
    }
}

export default API400Error;