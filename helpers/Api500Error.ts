import BaseError from "./baseError";
import httpStatusCodes from "./httpStatusCodes";

export class Api500Error extends BaseError{
    constructor(name:string, 
        statusCode:number = httpStatusCodes.INTERNAL_SERVER_ERROR ,
        description:string = 'INTERNAL SERVER ERROR',
        isOperational = true){
            super(name, statusCode, isOperational, description);
        }

}