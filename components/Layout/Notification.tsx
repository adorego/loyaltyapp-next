import React from 'react';
import classes from './Notification.module.css';

export interface NotificationProps{
    message:string;
    color:string;
}

const Notification = (props:NotificationProps) =>{
    
    const dinamicClass = classes.notification + ' ' + classes[props.color];
    console.log('dinamicClass:', dinamicClass);
    return (
        <div className={dinamicClass}>
            <p className={classes.message}>{props.message}</p>
        </div>
    )
}

export default Notification;