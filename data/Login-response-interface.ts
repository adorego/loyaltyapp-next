export default interface LoginResponseInterface{
    name:boolean,
    data?:{
        university:{
            _id:string,
            normalize_name:string,
            name:string,
            sigla:string
        },
        user:{
            _id:string,
            email:string,
            university_id:string,
            admin:boolean,
            verified:boolean
            
        },
        token:string
    }
    
}