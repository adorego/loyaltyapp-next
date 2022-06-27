import { FaCalendarTimes, FaCalendarWeek, FaShare, FaShareAlt, FaUserCheck, FaUserFriends } from "react-icons/fa";

import { ReactNode } from "react";
import classes from './CardSection.module.css';

export interface CardSectionProps{
    type:string;
    validityFrom?:string;
    validityTo?:string;
    term?:string;
    places?:string;
    rewardForSharing?:string;
    rewardForRegistration?:string;
    title?:string;
}

const CardSection = (props:CardSectionProps) =>{
    if(props.type === 'validity'){
        return(
            <div className={classes.Container}>
                <div className={classes.FirstRowContainer}>
                    <div className={classes.icon}>
                        <FaCalendarWeek />
                    </div>
                    <div className={classes.datesContainer}>
                        <div className={classes.validityFrom}>{props.validityFrom}</div>
                        <div className={classes.validityTo}>{props.validityTo}</div>
                    </div>
                    
                    
                </div>
                <div className={classes.TitleContainer}>
                    <p className={classes.Title}>{props.title}</p>
                </div>
                
                
    
            </div>
        )
    }
    if(props.type === 'term'){
        return(
            <div className={classes.Container}>
                <div className={classes.FirstRowContainer}>
                    <div className={classes.icon}>
                        <FaCalendarTimes />
                    </div>
                    <div className={classes.textContainer}>
                        <div className={classes.TermText}>{props.term}</div>
                    </div>
                    
                    
                </div>
                <div className={classes.TitleContainer}>
                    <p className={classes.Title}>{props.title}</p>
                </div>
                
                
    
            </div>
        )
    }
    if(props.type === 'places'){
        return(
            <div className={classes.Container}>
                <div className={classes.FirstRowContainer}>
                    <div className={classes.icon}>
                        <FaUserFriends />
                    </div>
                    <div className={classes.textContainer}>
                        <div className={classes.TermText}>{props.places}</div>
                    </div>
                    
                    
                </div>
                <div className={classes.TitleContainer}>
                    <p className={classes.Title}>{props.title}</p>
                </div>
                
                
    
            </div>
        )
    }

    if(props.type === 'rewards'){
        return(
            <div className={classes.RewardContainer}>
                <div className={classes.TitleRewardContainer}>
                    <div className={classes.Title}>{props.title}</div>
                </div>
                <div className={classes.FirstRowContainer}>
                    <div className={classes.ShareRewardSection}>
                        <div className={classes.icon}>
                            <FaShareAlt />
                        </div>
                        <div className={classes.TextShareReward}>{props.rewardForSharing}</div>
                    </div>
                    <div className={classes.ShareRewardSection}>
                        <div className={classes.icon}>
                            <FaUserCheck />
                        </div>
                        <div className={classes.TextRegistrationReward}>{props.rewardForRegistration}</div>
                    </div>
                    
                    
                </div>
                
                
                
    
            </div>
        )
    }

    return(
        <p>Parametro invalido</p>
    )

}


export default CardSection;