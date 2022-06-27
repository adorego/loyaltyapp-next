import React, { Fragment } from 'react';

import Button from '../Button';
import Input from '../Input';
import classes from './PointsToMoneyForm.module.css';
import {useState} from 'react';

export interface PointsForMoney{
    money:string;
    points:string;
}

export interface PointToMoneyFormProps{
    onSubmitHandler:(data:PointsForMoney) => void;
    moneyValue:string;
}

const PointsToMoneyForm = (props:PointToMoneyFormProps) =>{
    const [selectedValue, setSelectedValue] = useState(props.moneyValue ? props.moneyValue : '100.000');

    const onSubmitForm = (event:React.SyntheticEvent) =>{
        event.preventDefault();
        props.onSubmitHandler({money:selectedValue, points:'100'})

    }
    
    const onChangeSelectedValue = (event:React.ChangeEvent<HTMLInputElement>) =>{
        const value = event.target.value;
        setSelectedValue(value);
    }

    return(
        <Fragment>
            <form id="formId" onSubmit={onSubmitForm}>
                <Input label='Puntos' value="100" additionalAttributes={{readOnly:true, marginleft:-100}}/>
                <h2 style={{textAlign:'center'}}>Equivalen a:</h2>
                <div className={classes.checkboxContainer}>
                    <input name='money' type="radio" id="inputPointsToMoney1" onChange={onChangeSelectedValue} checked ={selectedValue === '10.000'} value="10.000" />
                    <label htmlFor="inputPointsToMoney1">10.000 Gs</label>
                </div>
                <div className={classes.checkboxContainer}>
                    <input name='money' type="radio" id="inputPointsToMoney2" onChange={onChangeSelectedValue} checked ={selectedValue === '100.000'} value="100.000" />
                    <label htmlFor="inputPointsToMoney2">100.000 Gs <span style={{color:'green'}}>(Sugerido)</span></label>
                </div>
                <div className={classes.checkboxContainer}>
                    <input name='money' type="radio" id="inputPointsToMoney3" onChange={onChangeSelectedValue} checked ={selectedValue === '1.000.000'} value="1.000.000" />
                    <label htmlFor="inputPointsToMoney3">1.000.000 Gs</label>
                </div>
                <div className={classes.submitButton}>
                        <Button classOfButton="borderButton" label="Guardar"  additionalStyle={{color:"white", width:"60%", backgroundColor:"#8A66FF"}} />
                </div>
            </form>
        </Fragment>

    )
}

export default PointsToMoneyForm;