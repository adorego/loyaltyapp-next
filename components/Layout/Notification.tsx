import {AiOutlineCloseCircle} from "react-icons/ai";
import Button from '../UI/Button';
import {NotificationInterface} from '../../data/Notification-interface';
import React from 'react';
import classes from './Notification.module.css';
import { uiActions } from "../../store/ui-slice";
import { useAppDispatch } from "../../hooks/store-hooks";

const Notification = (props:NotificationInterface) =>{
    const dispatch = useAppDispatch();
    const onCloseEvent = (event:React.MouseEvent<HTMLButtonElement>) =>{
        dispatch(uiActions.showNotification({show:false, message:''}));
    }
    return (
        <div className={classes.notification}>
            <div className={classes.closeButton}>
                <Button classOfButton='icon' label='' onClickHandler={onCloseEvent}>
                    <AiOutlineCloseCircle />
                </Button>
            </div>
            <p className={classes.message}>{props.message}</p>
        </div>
    )
}

export default Notification;