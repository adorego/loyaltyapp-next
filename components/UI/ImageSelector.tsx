import React, { Fragment, memo, useEffect, useState } from "react";

import Button from "./Button";
import ImageSelectorInterface from "../../data/UI/ImageSelector-Interface";
import classes from "./ImageSelector.module.css";
import { url } from "inspector";
import { useAppDispatch } from "../../hooks/store-hooks";
import { useAppSelector } from "../../hooks/store-hooks";
import { useRef } from "react";

const ImageSelector = (props:ImageSelectorInterface) =>{
    const [fileSelected, setFileSelected] = useState<File>();
    const [readedFile, setReadedFile] = useState<string|ArrayBuffer>();
    const selectedFileInput = useRef<HTMLInputElement>(null);

    

    const submitLogo = (event:React.ChangeEvent<HTMLButtonElement>) =>{
        event.preventDefault();
        selectedFileInput.current?.click();
    }

    const changeHandler = async (event:React.ChangeEvent<HTMLInputElement>) =>{
        
        if(event && event.target && event.target.files && event.target.files[0]){
            const logo = event.target.files[0];
            setFileSelected(event.target.files[0]);
            props.imageLoaded(logo);
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
            <p className={classes.label}>{props.label}</p>
            <div className={classes.box} style={{backgroundImage: readedFile ? `url(${readedFile})` : props.image ? `url(${props.image})` : 'none'}}>
                <div className={classes.selector}>
                    <input id="imageSelectorId" ref={selectedFileInput} type="file" name="file" onChange={changeHandler} style={{display:"none"}}  />
                    <Button onClickHandler={submitLogo} label="Seleccionar" classOfButton="borderButton" additionalStyle={{display:"tableCell",color:"black", verticalAlign:"middle",backgroundColor:"lightgrey"}}></Button>
                </div>
            </div>
        </Fragment>
    )
}

export default memo(ImageSelector);
