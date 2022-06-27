import { FaAngleRight } from "react-icons/fa";
import { Fragment } from "react";
import SeccionHeader from "../../../components/UI/SeccionHeader";
import classes from '../../../styles/Configuration.module.css';
import spinnerClasses from '../../../styles/spinner.module.css';
import { useRouter } from "next/router";
import { useSession } from "next-auth/react";

const Configuration = () =>{
    const {status} = useSession();
    const router = useRouter();
    const {universityId} = router.query;

    if(status === 'loading'){
        return <div className={spinnerClasses["lds-dual-ring"]}></div>
    }
    if(status === 'authenticated'){
        if(universityId){
            
            return(
                <Fragment>
                <SeccionHeader centerMarginTitle={false} titleText="Configuración" subTitleText={"Personaliza tu LoyaltyAPP"} />
                
                <div className={classes.container}>
                    <div className={classes.navSection} onClick={() => router.push(`/${universityId}/configuration/perfil`)}>
                        <h4 id="prefilTextId" className={classes.textSection}>Perfil</h4>
                        <FaAngleRight className={classes.arrowSection} />
                    </div>
                    <div className={classes.navSection} onClick={() => router.push(`/${universityId}/configuration/logoapp`)}>
                        <h4 id="logoTextId" className={classes.textSection}>Logo</h4>
                        <FaAngleRight className={classes.arrowSection} />
                    </div>
                    <div className={classes.navSection} onClick={() => router.push(`/${universityId}/configuration/colorapp`)}>
                        <h4 id="colorTextId" className={classes.textSection}>Color</h4>
                        <FaAngleRight className={classes.arrowSection} />
                    </div>
                </div>
                    
                </Fragment>
            )
        }else{
            return <div className={spinnerClasses["lds-dual-ring"]}></div>
        }
    }
    if(status === 'unauthenticated'){
        {router.push('/login')}
        return <div className={spinnerClasses["lds-dual-ring"]}></div>
        
    }
}

export default Configuration;