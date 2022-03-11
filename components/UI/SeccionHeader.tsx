import {Fragment} from 'react';
import SeccionHeaderInterface from '../../data/UI/SecccionHeader-interface';
import classes from './SeccionHeader.module.css';

const SeccionHeader = (props:SeccionHeaderInterface) => {
    return(
        <Fragment>
            <h1 className={classes.title}>{props.titleText}</h1>
            <div className={classes.subtitle}>
                <div className={classes.circle}>
                                {props.number}
                </div>
            
                <h2 className={classes.subtitleText}>
                    {props.subTitleText}
                </h2>
            </div>
            <p>{props.explanationText}</p>
        </Fragment>

    )
}

export default SeccionHeader;