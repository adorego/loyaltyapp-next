import { Api500Error } from './Api500Error';
import fs from 'fs';

export const isFileValid = (file:any) =>{
    const type = file.mimetype.split("/").pop();
    const validType = ["jpg", "jpeg", "png", "pdf"];
    if(validType.indexOf(type) === -1){
        return false;
    }
    return true;
}

export const saveFile =  async (file:any, path:string, fileName:string) =>{
    console.log('Ingreso a saveFile', path, fileName);
    const data = fs.readFileSync(file.filepath);
    const folderName = path;
    try{
        if(!fs.existsSync(folderName)){
            console.log('No existe la carpeta.');
            fs.mkdirSync(folderName);
        }
    }catch(error){
        throw new Api500Error('Error al guardar el archivo en el servidor!.');
    }
    fs.writeFileSync(`${folderName}/${fileName}`, data, {flag: 'a+'});
    await fs.unlinkSync(file.filepath);
    console.log('Salió de saveFile');
    return
    

}