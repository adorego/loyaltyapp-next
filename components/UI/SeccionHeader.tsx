import {Fragment, useState} from 'react';

import Button from './Button';
import { FaAngleLeft } from 'react-icons/fa';
import { FaPen } from 'react-icons/fa';
import SeccionHeaderInterface from '../../data/UI/SecccionHeader-interface';
import classes from './SeccionHeader.module.css';
import { motion } from 'framer-motion';
import { useAppSelector } from '../../hooks/store-hooks';
import {useRouter} from 'next/router';

export interface SeccionHeaderProps{
    titleText:string;
    subTitleText?:string;
    explanationText?:string;
    highlightText?:string;
    centerMarginTitle:boolean;
}
const initialProps = {
    titleText:"",
    subTitleText:"",
    explanationText:"",
    highlightText:"",
    centerMarginTitle:false
    
}

const SeccionHeader = (props:SeccionHeaderProps = initialProps) => {
    const router = useRouter();
    const path = router.pathname;
    const pointsAndMoney = useAppSelector(state => state.configuration.pointsConversion);
    const [showHelp, setShowHelp] = useState(false);

    
    let dinamycTitleClass = `${classes.title}`;
    props.centerMarginTitle ? dinamycTitleClass += ` ${classes.centerTitle}` : '';
    
    let dinamycSubTitleClass = `${classes.subTitleText}` ;
    props.centerMarginTitle ? dinamycSubTitleClass += ` ${classes.centerTitle}` : '';

    const onReturnHandler = () =>{
        router.back();
    }

    
    const onHelpClick = () =>{
        setShowHelp(!showHelp);
    }

    const onHelpSkip = () =>{
        setShowHelp(false);
    }
    return(
            <Fragment>
                <nav className={classes.topElements}>
                    <div className={classes.returnIconContainer}>
                            <FaAngleLeft onClick={onReturnHandler} className={classes.returnIcon}/>
                    </div>
                    <div className={classes.helpLinkContainer}>
                            <a className={classes.helpLink} onClick={onHelpClick}>Ayuda</a>
                    </div>
                    {showHelp && <div className={classes.HelpContent}>
                        
                    </div>}
                </nav>
                
               
                <h3 id="titleId" className={`${dinamycTitleClass}`} >
                    {props.titleText}
                </h3>
                
                
                
                    
                {props.subTitleText && <h5 className={dinamycSubTitleClass}>
                            {props.subTitleText}
                        </h5>}
                
                {props.explanationText && <p className={classes.explanation}>{props.explanationText}</p>}
                {props.highlightText && <div className={classes.highlightTextClass}>{props.highlightText}</div>}
                
            </Fragment>
        

    )
}

export default SeccionHeader;