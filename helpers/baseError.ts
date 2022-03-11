class BaseError extends Error{
    name:string;
    statusCode:number;
    isOperational:boolean;
    description:string;
    constructor(name:string, statusCode:number, isOperational:boolean, description:string){
        super(description);
        this.name = name;
        this.statusCode = statusCode;
        this.isOperational = isOperational;
        this.description = description;
        Error.captureStackTrace(this);
    }
}


export default BaseError;