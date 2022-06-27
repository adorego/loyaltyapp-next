import { Api500Error } from './Api500Error';
import fs from 'fs';

export const isFileValid = (file:any) =>{
    if(!file){
        
        return false;
    }
    const type = file.mimetype.split("/").pop();
    const validType = ["jpg", "jpeg", "png", "pdf", "webp"];
    if(validType.indexOf(type) === -1){
        return false;
    }
    return true;
}

export const saveFile =  async (file:any, path:string, fileName:string) =>{
    const data = fs.readFileSync(file.filepath);
    const folderName = path;
    console.log("Data:", data);
    console.log("New path:", `${folderName}${fileName}`);
    try{
        if(!fs.existsSync(folderName)){
            console.log('No existe la carpeta.');
            fs.mkdirSync(folderName);
        }
        fs.writeFileSync(`${folderName}${fileName}`, data, {flag: 'w+'});
        fs.unlinkSync(file.filepath);
    }catch(error){
        throw new Api500Error('Error al guardar el archivo en el servidor!.');
    }
    
    return
    

}