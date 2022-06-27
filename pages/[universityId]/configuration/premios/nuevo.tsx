import React, { Fragment } from "react";

import NewRewardForm from "../../../../components/UI/Configuration/NewRewardForm";
import SeccionHeader from "../../../../components/UI/SeccionHeader";
import spinnerClasses from '../../../../styles/spinner.module.css';
import { useRouter } from "next/router";
import { useSession } from "next-auth/react";

const NewReward = () =>{
    const router = useRouter();
    const {data:session, status} = useSession();
    const {universityId:universitySiglaId} = router.query;

    const onNewRewardSubmit = (e:React.FormEvent<HTMLFormElement>) =>{
        e.preventDefault();
    }
    if(status === 'authenticated'){
        return(
            <Fragment>
                <SeccionHeader titleText="Nuevo Premio" />
                <NewRewardForm onCreatePremio={onNewRewardSubmit}/>
            </Fragment>
        )
    }
    if(status === 'loading' || !universitySiglaId){
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

export default NewReward;