import { compare, genSalt, hash } from "bcrypt";
export async function hashPassword(password:string):Promise<string>{
    const saltRound = 10;
    const salt = await genSalt(saltRound);
    const hashedPassword = await hash(password, salt);
    return hashedPassword;
}

export async function verify_password(password:string, hashedPassword:string){
   const result = await compare(password, hashedPassword);
   return result;
}   
