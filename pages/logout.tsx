import {signOut, useSession} from 'next-auth/react';

import spinnerClasses from '../styles/spinner.module.css';
import {useRouter} from 'next/router';

const Logout = () =>{
    const {data:session,status} = useSession();
    const router = useRouter();
    
    if(status === 'unauthenticated'){
        router.push('/login');
        
    }


    if(status === 'authenticated'){
        signOut();
    }
    return(
        <div className={spinnerClasses["lds-dual-ring "]}></div>
    )
}

export default Logout;