import LandingTemplateList from "../../../../components/UI/Configuration/Landing/LandingTemplateList";
import spinnerClasses from '../../../../styles/spinner.module.css';
import { useRouter } from "next/router";
import { useSession } from "next-auth/react";

const LandingTemplateListPage = () =>{
    const {data:session, status} = useSession();
    const router = useRouter();

    if(status === 'authenticated'){
        return (
            <LandingTemplateList landingTemplatesList={[]} />
        )
    }
    if(status === 'unauthenticated'){
        router.push('/login');
        return(
            <div className={spinnerClasses["lds-dual-ring "]}></div>
        )
    }

    if(status === 'loading'){
        return(
            <div className={spinnerClasses["lds-dual-ring "]}></div>
        )
    }
}

export default LandingTemplateListPage;