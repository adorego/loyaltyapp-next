import { FaAngleLeft, FaAngleRight, FaArrowAltCircleRight, FaArrowRight, FaMinus, FaPlus } from 'react-icons/fa';
import React, { Fragment, useRef, useState } from 'react';

import Button from './Button';
import Image from 'next/Image';
import browserImageSize from "browser-image-size"
import classes from './MultipleImageSelector.module.css';

interface image{
    imageUrl:string;
    width:string; 
    height:string;
}
const initialImage ={
    imageUrl:'',
    width:'',
    height:''
}
export interface MultipleImageSelectorProps{

}
const MultipleImageSelector = (props:MultipleImageSelectorProps) =>{
    const selectedFileInput = useRef<HTMLInputElement>(null);
    const isEmptyImage = useRef<boolean>(false);
    const images = useRef<Array<image>>([]);
    const [currentImageIndex, setCurrentImageIndex] = useState(0);
    const [currentImage, setCurrentImage] = useState<image>(initialImage);
    

    const onImageSelectClickHandler = () =>{
        selectedFileInput.current?.click();
    }

    const changeHandler = async (e:React.ChangeEvent<HTMLInputElement>) =>{
        if(e.target && e.target.files && e.target.files[0]){
            const image = e.target.files[0];
            const reader = new FileReader();
            reader.onload = async (e) => {
                if(e?.target?.result){
                      const readedImage = e.target.result;
                      const dimensions = await browserImageSize(readedImage.toString());
                      const currentImage = {
                        imageUrl:String(readedImage),
                        width:String(dimensions.width),
                        height:String(dimensions.height)
                      }
                      if(isEmptyImage.current){
                        images.current = images.current.filter(
                            (element) => element.imageUrl !== ''
                        )
                        isEmptyImage.current = false;
                      }
                      images.current.push(currentImage);
                      setCurrentImage(currentImage);
                      console.log("images:", images);
                      setCurrentImageIndex(images.current.length-1);
                       
                    }
            };
            reader.readAsDataURL(image);
            
            
            
            
        }
    }

    const onNextImageClickHandler = () =>{
        console.log("currentImageIndex:", currentImageIndex);
        if(currentImageIndex === images.current.length - 1){
            setCurrentImageIndex(0);
            
        }else{
            setCurrentImageIndex(prev => prev + 1);
        }
        setCurrentImage(images.current[currentImageIndex])
    }

    const onPreviusImageClickHandler = () =>{
        console.log("currentImageIndex:", currentImageIndex);
        if(currentImageIndex === 0){
            setCurrentImageIndex(images.current.length-1);
            
        }else{
            setCurrentImageIndex(prev => prev - 1);
        }
        setCurrentImage(images.current[currentImageIndex])
    }

    const onPlusClickHandler = () =>{
        const emptyImage = {
            imageUrl:'',
            width:'',
            height:''
        }
        isEmptyImage.current = true;
        setCurrentImage(emptyImage);
        images.current.push(emptyImage);
    }

    const onMinusClickHandler = () =>{
        console.log('currentImageIndex:', currentImageIndex);
        if(images.current.length > 0 && images.current[currentImageIndex].imageUrl !== ''){
            images.current.splice(currentImageIndex, 1);
            setCurrentImageIndex(prev => prev - 1);
            setCurrentImage(images.current[currentImageIndex]);
        }
    }

    console.log("currentImage:", currentImage);
    return(
        <Fragment>
            <div className={classes.container} style={{backgroundImage: currentImage ? `url(${currentImage.imageUrl})`  : 'none'}}>
                {images.current.length > 1 && <FaAngleRight className={classes.rightArrow} onClick={onNextImageClickHandler} />}
                {images.current.length > 1 && <FaAngleLeft className={classes.leftArrow} onClick={onPreviusImageClickHandler} />}
                <div className={classes.imageSelectorContainer} >
                    <input id="imageSelectorId" ref={selectedFileInput} type="file" name="file" onChange={changeHandler} style={{display:"none"}}   />
                    <Button isAvailable={true} onClickHandler={onImageSelectClickHandler} label="Seleccionar" 
                                        additionalStyle={{
                                        color:"var(--on-surface-text-color)", 
                                        verticalAlign:"middle",
                                        width:"120px",
                                        backgroundColor:"var(--surface-color)",
                                        border:"1px solid var(--secondary-color)",
                                        opacity:"0.8"}} />
                </div>
            </div>
            
            <div className={classes.buttonContainer}>
                <FaMinus className={classes.minusButton} onClick={onMinusClickHandler} />
                <FaPlus className={classes.plusButton} onClick={onPlusClickHandler} />
            </div>
        </Fragment>
    )
}

export default MultipleImageSelector;