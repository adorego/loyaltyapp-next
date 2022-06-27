import BaseError from "./baseError";
import httpStatusCodes from "./httpStatusCodes";
export class API401Error extends  BaseError{
    constructor(name:string, 
        statusCode:number = httpStatusCodes.UNAUTHORIZED ,
        description:string = 'UNAUTHORIZED_REQUEST',
        isOperational = true){
            super(name, statusCode, isOperational, description);
        
    }
}

export default API401Error;