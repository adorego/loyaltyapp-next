import CrudToolBar from '../UI/CrudToolBar';
import Image from 'next/Image'
import ModalMessage from './ModalMessage';
import classes from './RewardCard.module.css';
import { uiActions } from '../../store/ui-slice';
import { useAppDispatch } from '../../hooks/store-hooks';
import {useRouter} from 'next/router';
import { useState } from 'react';

export interface ImageProp{
    url:string;
    alt:string;
    width:number;
    height:number;

}
export interface RewardCardProps{
    additionalStyle?:{};
    id:string;
    image:ImageProp;
    title:string;
    description:string;
}
const RewardCard = (props:RewardCardProps) =>{
    const router = useRouter();
    const {universityId:universitySiglaId} = router.query;
    const dispatch = useAppDispatch();
    const [showModal, setShowModal] = useState(false);

    const onEditClickHandler = () =>{

    }

    const onModalClose = () =>{
        setShowModal(false);
    }

    const onDeleteClickHandler = () =>{
        setShowModal(true);
    }

    const onModalConfirmHandler = async () =>{
        const result = await fetch(`/api/configuration/${universitySiglaId}/reward/${props.id}`,{
            method:'DELETE'
        });
        if(!result.ok){
            // console.log('Result:', result);
            dispatch(uiActions.showNotification({show:true, message:"No se pudo eliminar el Premio", color:'red'}))     
        }else{
            dispatch(uiActions.showNotification({show:true, message:"Operación ejecutada exitosamente", color:'green'}));    
        }
        router.replace(`/${universitySiglaId}/configuration/premios`);
    }

    console.log('width:', props.image.width, 'height:', props.image.height);
    return(
        <div className={classes.box} style={{...props.additionalStyle}}>
            {showModal && <ModalMessage message='Vas a eliminar este Premio?' 
            confirmCallBack={onModalConfirmHandler} closeCallBack={onModalClose} />}
            <div className={classes.ImageContainer}>
                <div className={classes.InnerImageContainer}>
                    <Image  
                        layout={'responsive'}
                        src={props.image.url}   
                        width={props.image.width}
                        height={props.image.height}
                        priority={true}
                        alt={props.image.alt} />
                </div>
                <div className={classes.CrudToolBarContainer}>
                    <CrudToolBar onEditHandler={onEditClickHandler} onDeleteHandler={onDeleteClickHandler} />
                </div>
            </div>
            <div className={classes.TitleContainer}>
                <div className={classes.Title}>{props.title}</div>
            </div>
            <div className={classes.DescriptionContainer}>
                <div className={classes.DescriptionTitle}>Descripción:</div>
                <div className={classes.Description}>{props.description}</div>
                
            </div>
           


        </div>
    )
}

export default RewardCard;