import {signOut, useSession} from "next-auth/client";

import Button from "../UI/Button";
import {FaBars} from "react-icons/fa";
import HeaderInterface from "../../data/Header-interface";
import classes from "./Header.module.css";
import {useAppSelector} from "../../hooks/store-hooks";
import {useRouter} from 'next/router';

const Header = (props:HeaderInterface) =>{
    // const isLogged = useAppSelector(state => state.auth.isLogged);
    const [session, loading] = useSession();
    const logo = useAppSelector(state => state.auth.university.frontEndCompletePath);
    const email = useAppSelector(state => state.auth.user.email);
    const router = useRouter();
    

    const noLogo = logo === '';

    let logoToShow;
    if(noLogo){
        logoToShow = <img alt="logo" src={props.logoSrc} className={classes.logo} style={{maxWidth:"150px", height:"auto"}} />;
    }else{
        logoToShow = <img alt="logo" src={logo} className={classes.logo} style={{maxWidth:"80px", height:"auto"}} />
    }

    const logout = () =>{
        router.push('/login');
        
        signOut();
        

    }
    return(
        <nav className={classes.header} style={{backgroundColor:props.backgroundColor}}>
            <div className={classes.firstRow}>
                
                <Button   label=""  classOfButton="hamburguer" additionalStyle={{marginleft:0, padding:0}}>
                    <FaBars className={classes.bars} />
                </Button>

                
                
                <Button label="Instalar en mi móvil" classOfButton="borderButton" additionalStyle={{border: "1px solid lightgrey"}}/>
                
            </div>
            <div className={classes.secondRow}>
                <div>
                    {logoToShow}
                    {/* <p className={classes.logo_text}>LoyaltyAPP-Universidad</p> */}
                </div>
            
                <div>
                    {session && <Button label="Salir" onClickHandler={logout} classOfButton="borderButton" additionalStyle={{width:"120px", marginLeft:"10px"}} /> }
                </div>
            </div>
            <div className={classes.welcomeSection}>
                {session && <span className={classes.welcomeTitle}>{props.welcome_title + " " + email}</span>}
            </div>
                    

           
            
        </nav>
    )
}

export default Header;