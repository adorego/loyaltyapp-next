import React, { Fragment, memo, useCallback, useEffect, useState } from "react";

import Button from "./Button";
import ImageSelectorInterface from "../../data/UI/ImageSelector-Interface";
import classes from "./ImageSelector.module.css";
import { uiActions } from "../../store/ui-slice";
import { useAppDispatch } from "../../hooks/store-hooks";
import { useRef } from "react";

const ImageSelector = (props:ImageSelectorInterface) =>{
    const [fileSelected, setFileSelected] = useState<File>();
    const [readedFile, setReadedFile] = useState<string|ArrayBuffer>();
    const selectedFileInput = useRef<HTMLInputElement>(null);
    const dispatch = useAppDispatch();
    const {image:imageFile, imageLoaded} = props;
    
    useEffect(
        () =>{
            const readImageFromFile = async() =>{
                if(imageFile){
                    const response = await fetch(imageFile);
                    const blob = await response.blob();
                    const file = new File([blob], 'image.jpg', {type: blob.type});
                    setFileSelected(file);
                    imageLoaded(file, false);
                    
                }
            }

            try{
                readImageFromFile();
            }catch(error){
                dispatch(uiActions.showNotification({show:true,message:error, color:'red'}));
            }
        },[imageFile, dispatch]
    )
    
    
    
    

    const submitLogo = (event:React.ChangeEvent<HTMLButtonElement>) =>{
        event.preventDefault();
        selectedFileInput.current?.click();
    }

    const changeHandler = async (event:React.ChangeEvent<HTMLInputElement>) =>{
        
        if(event && event.target && event.target.files && event.target.files[0]){
            const logo = event.target.files[0];
            setFileSelected(event.target.files[0]);
            imageLoaded(logo, true);
            const reader = new FileReader();
            reader.onload = (e) => {
                if(e?.target?.result){
                      
                      setReadedFile(e.target.result);
                       
                    }else{
                      setReadedFile('');
                    } 
                }
            const file = event.target.files[0];
            reader.readAsDataURL(file);
        }
        
    }
    
    
    return(
        <Fragment>
            <p className={`${classes.label} body1`}>{props.label}</p>
            <div className={classes.box} style={{backgroundImage: readedFile ? `url(${readedFile})` : props.image ? `url(${props.image})` : 'none'}}>
                <div className={classes.selector}>
                    <input id="imageSelectorId" ref={selectedFileInput} type="file" name="file" onChange={changeHandler} style={{display:"none"}}  />
                    <div className={classes.buttonContainer}>
                        <Button isAvailable={true} onClickHandler={submitLogo} label="Seleccionar" 
                        additionalStyle={{display:"tableCell",
                        color:"var(--on-surface-text-color)", 
                        verticalAlign:"middle",
                        width:"120px",
                        backgroundColor:"var(--surface-color)",
                        border:"1px solid var(--secondary-color)",
                        opacity:"0.8"}} />
                    </div>
                </div>
               
            </div>
        </Fragment>
    )
}

export default memo(ImageSelector);
