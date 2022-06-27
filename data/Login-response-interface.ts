export default interface LoginResponseInterface{
        university:{
            _id:string,
            name:string,
            sigla:string
        },
        user:{
            _id:string,
            email:string,
            admin:boolean,
            verified:boolean
            
        }
        
    
    
}