import { Fragment, useRef, useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../../../hooks/store-hooks';

import BenefitForm from '../../../../components/UI/Configuration/BenefitForm';
import SeccionHeader from '../../../../components/UI/SeccionHeader';
import { authActions } from '../../../../store/auth-slice';
import { fetchAuthData } from '../../../../store/auth-actions';
import spinnerClasses from '../../../../styles/spinner.module.css';
import { uiActions } from '../../../../store/ui-slice';
import { useRouter } from "next/router";
import { useSession } from "next-auth/react";

const NuevoBeneficio = () =>{
    const {data:session, status} = useSession();
    const router = useRouter();
    const universitySiglaId = useAppSelector(state => state.auth.university.sigla);
    const dispatch = useAppDispatch();
    
    console.log('universitySiglaId:', universitySiglaId);

    if(status === 'authenticated'){
        if(!universitySiglaId){
            console.log('Before dispatch fetchAuthData');
            session.user && session.user.email && dispatch(fetchAuthData(session.user.email));
        }
        return(
            <Fragment>
                <BenefitForm edit={false}  title={'Nuevo Beneficio Digital'} />
                
            </Fragment>
        )
    }

    if(status === 'loading'){
        return(
            <div className={spinnerClasses["lds-dual-ring "]}></div>
        )
    }
    if(status === 'unauthenticated'){
        router.push('/login');
        return(
            <div className={spinnerClasses["lds-dual-ring "]}></div>
        )
    }
}

export default NuevoBeneficio;