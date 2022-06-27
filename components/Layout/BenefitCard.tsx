import BasicCard from "./BasicCard"
import Button from "../UI/Button";
import Image from 'next/Image';
import classes from './BenefitCard.module.css';
import { configurationActions } from "../../store/configuration-slice";
import { useAppDispatch } from "../../hooks/store-hooks";

export interface BenefitCardProps{
    _id:string;
    image_url:string;
    image_width:number;
    image_height:number;
    title:string;
    description:string;
    benefitHeader:string;
    benefitExclusiveCommunication:string;
    selection:boolean;
    onBenefitSelected:() => void;
    
}
const BenefitCard = (props:BenefitCardProps) =>{
    const dispatch = useAppDispatch();


    const onSelectionHandler = () =>{
        //dispatch select_benefit
        dispatch(configurationActions.select_benefit({
            _id:props._id,
            pageHeader:props.benefitHeader,
            exclusiveComunication:props.benefitExclusiveCommunication,
            title:props.title,
            description:props.description,
            image_frontEnd:props.image_url,
            image_width:props.image_width,
            image_height:props.image_height
        }));
        props.onBenefitSelected();
    }

    return(
        <BasicCard>
            <div className={classes.container}>
                <Image src={props.image_url}
                 width={props.image_width} 
                 height={props.image_height} 
                 alt={'Imagen del Beneficio'} 
                 className={classes.benefitImage}
                 layout={'responsive'}/>
                 <div className={classes.contentActionContainer}>
                     <div className={classes.contentSection}>
                         <div className={classes.titleContainer}>
                            <p className={`${classes.title} subtitle1`}>Titulo:</p>
                            <p className={`${classes.titleContent} caption`}>{props.title}</p>
                        </div>
                        <div className={classes.descriptionContainer}>
                            <p className={`${classes.description} subtitle1`}>Descripción:</p>
                            <p className={`${classes.descriptionContent} caption`}>{props.description}</p>
                        </div>
                        <div className={classes.pageHeaderContainer}>
                            <p className={`${classes.pageHeader} subtitle1`}>Cabecera:</p>
                            <p className={`${classes.pageHeaderContent} caption`}>{props.benefitHeader}</p>
                        </div>
                        <div className={classes.exclusiveCommunicationContainer}>
                            <p className={`${classes.exclusiveCommunication} subtitle1`}>Comunicación de exclusividad:</p>
                            <p className={`${classes.exclusiveCommunicationContent} caption`}>{props.benefitExclusiveCommunication}</p>
                        </div>
                        
                     </div>
                     {props.selection && 
                     <div className={classes.selectionButton}>
                        <Button label='Seleccionar' 
                                onClickHandler={onSelectionHandler}
                                additionalStyle={{
                                    backgroundColor:"var(--primary-color)", 
                                    color:"var(--on-primary-text-color)", 
                                    width:"100%", height:"49px"
                                }} />
                     </div>}
                     <p className={`${classes.previewLink} caption`}>Previsualizar</p>
                 </div>
            </div>

        </BasicCard>
    )
}

export default BenefitCard;