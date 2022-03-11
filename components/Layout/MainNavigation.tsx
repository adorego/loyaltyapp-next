import Button from "../UI/Button";
import { Fragment } from "react";
import Header from './Header';
import MainNavigationInterface from "../../data/MainNavigation-interface";
import Notification from "./Notification";
import classes from "./MainNavigation.module.css";
import { useAppSelector } from "../../hooks/store-hooks";

const MainNavigation = (props:MainNavigationInterface) =>{
    const notification = useAppSelector(state => state.ui.notification);
    return(
        <Fragment>
            <header>
                <Header welcome_title='Bienvenido' backgroundColor='#B11016' logoSrc='/images/logo_loyaltyapp_universidad.png'/>
            </header>
            {notification.show && <Notification message={notification.message} />}
            
            <main className={classes.main}>
                
                {props.children}
            </main>
            <footer>
                <div className={classes.shareButton}>

                    <Button classOfButton="borderButton" 
                    label="Compartir esta APP con un alumno" 
                    additionalStyle={{color:"white", width:"auto", backgroundColor:"#B11016"}} />
                </div>
            </footer>
        </Fragment>
    )
}

export default MainNavigation;