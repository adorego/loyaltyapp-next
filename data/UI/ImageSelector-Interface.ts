export default interface ImageSelectorInterface{
    imageLoaded:(file:Blob) => (void);
    label?:string;
    image?:string;
}