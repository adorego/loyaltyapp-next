import { FaAngleLeft, FaAngleRight } from 'react-icons/fa';
import { Fragment, useState } from 'react';
import ImageCard, { imageToShow } from './ImageCard';

import BasicCard from './BasicCard';
import CrudToolBar from '../UI/CrudToolBar';
import LandingSectionInterface from '../../data/Configuration/LandingSection-interface';
import Link from 'next/link';
import ModalMessage from './ModalMessage';
import classes from './LandingCard.module.css';
import { uiActions } from '../../store/ui-slice';
import { useAppDispatch } from '../../hooks/store-hooks';
import {useRouter} from 'next/router';

export interface LandingCardProps{
    id:string;
    additionalStyle?:{};
    numberOfSections:number;
    section1_data:LandingSectionInterface;
    section2_data:LandingSectionInterface;
    section3_data:LandingSectionInterface;
}

const LandingCard = (props:LandingCardProps) =>{
    const [section, setSection] = useState<LandingSectionInterface>(props.section1_data);
    const [numberSection, setNumberSection] = useState<number>(1);
    const [showModal, setShowModal] = useState(false);
    const router = useRouter();
    const {universityId:universitySiglaId} = router.query;
    const dispatch = useAppDispatch();

    const filter_list = (images:Array<imageToShow>) =>{
        return images.filter(
            (image) =>{
                return image.url != undefined;
            }
        )
    }
    
    const onEditClickHandler = () =>{

    }

    const onDeleteClickHandler = () =>{
        setShowModal(true);
    }

    const onModalClose = () =>{
        setShowModal(false);
    }

    const onModalConfirm = async() =>{
        setShowModal(false);
        console.log('Confirm delete');
        const result = await fetch(`/api/configuration/${universitySiglaId}/landing_templates/${props.id}`,{
            method:'DELETE'
        });
        const data = await result.json();
        if(!result.ok){
            // console.log('Result:', result);
            dispatch(uiActions.showNotification({show:true, message:"No se pudo eliminar el template", color:'red'}))     
        }else{
            dispatch(uiActions.showNotification({show:true, message:"Operación ejecutada exitosamente", color:'green'}));    
        }
        router.reload();
    }

    const onNextSectionClick = () =>{
        switch(numberSection){
            case(1):
                if(props.section2_data){
                    setNumberSection(2);
                    setSection(props.section2_data);
                }
                break;
            case(2):
                if(props.section3_data){
                    setNumberSection(3);
                    setSection(props.section3_data);
                }else{
                    setNumberSection(1);
                    setSection(props.section1_data);
                }
                break;
            case(3):
                if(props.section1_data){
                    setNumberSection(1);
                    setSection(props.section1_data);
                }
                break;
        }

    }

    return(
        <BasicCard>
                <div className={classes.imageContainer}>
                    {(section && section.images.length > 1) && <ImageCard images={filter_list(section.images)} /> }
                    {(section && section.images.length === 1) && <ImageCard image={section.images[0]} />}
                    <div className={classes.CrudToolBarContainer}>
                            <CrudToolBar onEditHandler={onEditClickHandler} onDeleteHandler={onDeleteClickHandler} />
                    </div>
                </div>
            
        </BasicCard>


        // <div className={classes.box} style={{...props.additionalStyle}}>
        //     {showModal && <ModalMessage message='Vas a eliminar este modelo de Landing?' confirmCallBack={onModalConfirm} closeCallBack={onModalClose} />}
        //     <div className={classes.imageContainer}>
        //         {(section && section.images.length > 1) && <ImageCard images={filter_list(section.images)} /> }
        //         {(section && section.images.length === 1) && <ImageCard image={section.images[0]} />}
        //         <div className={classes.CrudToolBarContainer}>
        //                 <CrudToolBar onEditHandler={onEditClickHandler} onDeleteHandler={onDeleteClickHandler} />
        //         </div>
        //     </div>
        //     <div className={classes.SectionTitleContainer}>
        //         {section && section.title && <Fragment><div className={classes.title}>{`Sección${numberSection}`}</div>
        //         <div>{`${numberSection} de ${section.numberOfSection}`}</div></Fragment> }
        //         {props.numberOfSections > 1 && <FaAngleRight className={classes.RightArrow} onClick={onNextSectionClick} />}
        //         {numberSection > 1 && <FaAngleLeft className={classes.LeftArrow} />}
                
        //     </div>
        //     <div className={classes.BenefitViewLinkContainer}>
        //         <Link href={`/${universitySiglaId}/beneficio`}>
        //             <a className={classes.BenefitViewLink}>Ver Beneficio</a>
        //         </Link>
        //     </div>
        //     <div className={classes.TitleContainer}>
        //         <div className={classes.TitleHeader}>Titulo:</div>
        //         <div className={classes.TitleContent}>{section?.title}</div>
        //     </div>
        //     <div className={classes.OneTextOrMultipleContainer}>
        //         <div className={classes.OneTextOrMultipleHeader}>Solo un texto para la Sección:</div>
        //         <div className={classes.OneTextOrMultipleContent}>{section?.oneTextOnly ? 'SI' : 'NO'}</div>
        //     </div>
        //     <div className={classes.Text1Container}>
        //         <div className={classes.Text1Header}>Texto1:</div>
        //         <div className={classes.Text1Content}>{section && section.texts[0] ? section?.texts[0].slice(0,100) + '...' : ''}</div>
        //     </div>
        //     <div className={classes.Text2Container}>
        //         <div className={classes.Text2Header}>Texto2:</div>
        //         <div className={classes.Text2Content}>{section && section.texts[1] ? section?.texts[1].slice(0,100) + '...' : ''}</div>
        //     </div>
        //     <div className={classes.Text3Container}>
        //         <div className={classes.Text3Header}>Texto3:</div>
        //         <div className={classes.Text3Content}>{section && section.texts[2] ? section?.texts[2].slice(0,100) + '...' : ''}</div>
        //     </div>
        //     <div className={classes.Text4Container}>
        //         <div className={classes.Text4Header}>Texto4:</div>
        //         <div className={classes.Text4Content}>{section && section.texts[3] ? section?.texts[3].slice(0,100) + '...' : ''}</div>
        //     </div>
            
        // </div>
        
    )
}

export default LandingCard;