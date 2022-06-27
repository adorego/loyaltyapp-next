import { Fragment, useEffect, useState } from "react";

import { FaCircle } from "react-icons/fa";
import Image from "next/Image";
import classes from './ImageCard.module.css';

export type imageToShow = {
    url:string;
    alt:string;
    image_width:number;
    image_height:number;
   
}
export interface ImageCardProps{
    images?:imageToShow[];
    image?:imageToShow;
}

const ImageCard = (props:ImageCardProps) =>{
    
    const [image, setImage] = useState<imageToShow>(props.images ? props.images[0] : props.image ? props.image :{url:'',alt:'', image_width:0, image_height:0});
    

    
    const onNextImageClick = async (index:number) =>{
                setImage(props.images ? props.images[index] : {url:'',alt:'', image_width:0, image_height:0});
            
        
    }
    
    return(
        <div className={classes.ImageBox}>
             <Image className={classes.Image} 
             src={image.url} 
             priority={true}
             width={image.image_width/10}
             height={image.image_height/10} 
             layout={'responsive'}
             alt={image.alt} />
              
             {props.images ? props.images.map(
                 (image, index) =>{
                     return (
                         
                            <div key={index} className={classes.LinkContainer}>
                                <a className={classes.imagePointer}  onClick={() => onNextImageClick(index)}><FaCircle /></a>
                            </div>
                     )
                 }
             ) : ''}
        </div>
    )
}

export default ImageCard