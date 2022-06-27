import Button from "../Button";
import { Fragment } from "react";
import PremioInterface from "../../../data/Configuration/Premio-interface";
import RewardCard from "../../Layout/RewardCard";
import classes from "./RewardsList.module.css";
import {useRouter} from 'next/router';

export interface RewardsListProp{
    rewards:Array<PremioInterface>
}
const RewardsList = (props:RewardsListProp) =>{
    const router = useRouter();
    const {universityId:universiIdSigla} = router.query;

    const onNewPremioHandler = () =>{
        router.push(`/${universiIdSigla}/configuration/premios/nuevo`);
    }
    return(
        <Fragment>
        <div className={classes.nuevoPremioButton}>
                            <Button 
                            onClickHandler={onNewPremioHandler}
                            classOfButton="borderButton" 
                            label="Nuevo Premio" 
                            additionalStyle={{color:"black",paddingLeft:"2rem", paddingRight:"2rem", width:"auto", marginTop:0}} />
        </div>
        <div className={classes.RewardListContainer}>
            {props.rewards.map(
                (reward) =>{
                    const imageProp = {
                        url:String(reward.image_frontEnd),
                        alt:'',
                        width:(reward.image_width/10),
                        height:(reward.image_height/10)
                    }
                    return(
                        
                        <RewardCard 
                        key={reward._id}
                        id={reward._id ? String(reward._id) : ''}
                        image={imageProp} 
                        title={reward.title} 
                        description={reward.description} />
                    )
                }
            )}
        </div>
        </Fragment>
    )
}

export default RewardsList;