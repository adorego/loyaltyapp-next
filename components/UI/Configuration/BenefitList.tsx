import Benefit from '../../../data/Configuration/Benefit';
import BenefitCard from '../../Layout/BenefitCard';
import Button from '../Button'
import { Fragment } from 'react';
import SeccionHeader from '../SeccionHeader';
import classes from './BenefitList.module.css'
import { useAppSelector } from '../../../hooks/store-hooks';
import { useRouter } from 'next/router';

export interface BenefitListProps{
    benefits:Array<Benefit>;
    selection:boolean;
    oBenefitSelected:() => void;
}
const BenefitList = (props:BenefitListProps) =>{
    const router = useRouter();
    const universitySiglaId = useAppSelector(state => state.auth.university.sigla);
    
    const onNewBenefitClickHandler = () =>{
       
        universitySiglaId ? router.push(`/${universitySiglaId}/configuration/beneficios/nuevo`) : '';
         
    }
    
    return(
        <Fragment>
            <SeccionHeader centerMarginTitle={false} titleText="" subTitleText={""} />
            <div className={classes.container}>
                <h4 className={classes.title}>Beneficios</h4>
                <div className={classes.buttonContainer}>
                    
                    <Button isAvailable={true} label='Nuevo Beneficio' 
                        onClickHandler={onNewBenefitClickHandler}
                        additionalStyle={{
                            backgroundColor:"var(--primary-color)", 
                            color:"var(--on-primary-text-color)", 
                            width:"150px", height:"49px"
                        }} />
                </div>
                {props.benefits.length > 0 && 
                    <div className={classes.listContainer}>
                            {(props.benefits).map(
                                (benefit:Benefit) =>{
                                    
                                    console.log("benefit:", benefit);
                                    return (
                                        <BenefitCard 
                                        _id={String(benefit._id)}
                                        key={benefit._id}
                                        image_url={benefit.image_frontEnd} 
                                        image_width={benefit.image_width}
                                        image_height={benefit.image_height}
                                        title={benefit.title}
                                        description={benefit.description}
                                        benefitHeader={benefit.pageHeader}
                                        benefitExclusiveCommunication={benefit.exclusiveComunication}
                                        selection={props.selection}
                                        onBenefitSelected={props.oBenefitSelected}
                                        />
                                        
                                        )
                                    })
                            }




                    </div>}
                    {(!props.benefits || props.benefits.length === 0) && <h5 style={{textAlign:"center"}}>No tienes Beneficios en tu LoyaltyAPP</h5>}
            </div>
        </Fragment>
    )
}

export default BenefitList;