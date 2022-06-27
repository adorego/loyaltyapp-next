import { imageToShow } from './../../components/Layout/ImageCard';
export default interface LandingSectionInterface{
    oneTextOnly:boolean;
    formTitle:string;
    title:string[];
    texts:string[];
    images:imageToShow[];
    imagesFiles:Blob[];
}