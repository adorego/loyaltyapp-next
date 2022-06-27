import LandingForm from '../../../../../components/UI/Configuration/Landing/LandingForm';
import spinnerClasses from '../../../../../styles/spinner.module.css';
import { useRouter } from "next/router";
import { useSession } from "next-auth/react";

const NewLandingTemplate = () =>{
    const {data:session, status} = useSession();
    const router = useRouter();

    if(status === 'authenticated'){
        return <LandingForm />
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

export default NewLandingTemplate;