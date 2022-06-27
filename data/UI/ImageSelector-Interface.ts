export default interface ImageSelectorInterface{
    imageLoaded:(file:Blob, newLoaded:boolean) => (void); //Function to call on loaded image
    label?:string; //Label to set the component
    image?:string; //Load this image as default
}