import { FC, ReactNode } from "react";

import classes from './BasicCard.module.css'

export interface BasicCardProps{
    children:ReactNode;
    additionalStyle?:{};
}
const BasicCard:FC<BasicCardProps> = ({children, ...props}) => {

    return(
        <div className={classes.box} style={{...props.additionalStyle}}>
            {children}
        </div>
    )
}

export default BasicCard;