import Button from "../../../components/UI/Button";
import ColorAppInterface from "../../../data/Configuration/ColorApp-interface";
import { Fragment } from "react";
import SeccionHeader from "../../../components/UI/SeccionHeader";
import classes from '../../../styles/ColorApp.module.css';
import dynamic from 'next/dynamic';
import {useState} from 'react';

const ChromePicker = dynamic(
  () => import('react-color').then((mod) => mod.ChromePicker),
  { ssr: false }
);

const ColorApp = (props:ColorAppInterface) =>{
    const [color, setColor] = useState<string>();
    const handleChange = (color:string) =>{ 
        setColor(color);
    }
    
    return(
         <Fragment>
            <SeccionHeader titleText={'Configuración'} number={2} subTitleText={'Color'}  explanationText={'Selecciona el color de tu APP'} /> 
            
  
            <div className={classes.colorPicker}>
                <ChromePicker color={color} onChangeComplete={handleChange} />
            </div>

            <div className={classes.siguienteBox}>
                        <Button 
                            label="Siguiente" 
                            classOfButton="borderButton" 
                            additionalStyle={{backgroundColor:"#B11016", width:"50%"}} />
            </div>
  
         </Fragment>
    )
}

export default ColorApp;