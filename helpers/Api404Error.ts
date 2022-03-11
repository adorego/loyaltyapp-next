import BaseError from "./baseError";
import httpStatusCodes from "./httpStatusCodes";
export class Api404Error extends  BaseError{
    constructor(name:string, 
        statusCode:number = httpStatusCodes.NOT_FOUND ,
        description:string = 'NOT_FOUND_ERROR',
        isOperational = true){
            super(name, statusCode, isOperational, description);
        
    }
}

export default Api404Error;