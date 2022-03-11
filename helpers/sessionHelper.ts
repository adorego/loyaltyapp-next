import {getSession} from 'next-auth/client';

export  const isSessionValid = () =>{
    let result = false;
    const session = getSession().then(
        (session) =>{
            if(session){
                console.log('Has session:', session);
                result = true;
                
            }else{
                console.log('Don´t have session:', session);
                result = false;
                
            }
        }
        
    )
    return result;
    
    
}