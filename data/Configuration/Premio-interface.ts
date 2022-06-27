export enum PremiosType {
    dinero = "DINERO",
    merchandising = "MERCHANDISING",
    descuento = "DESCUENTO"
}
export default interface PremioInterface{
    _id?:string;
    image?:string;
    image_frontEnd?:string;
    image_width:number;
    image_height:number;
    image_blob:Blob;
    premioType:PremiosType;
    title:string;
    description:string;
    monto:number;
    equivalente_puntos:number;

}