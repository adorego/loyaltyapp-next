import React, { Fragment, useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../hooks/store-hooks";

import Header from './Header';
import HomeHeader from "./HomeHeader";
import MainNavigationInterface from "../../data/MainNavigation-interface";
import Notification from "./Notification";
import SideBar from "./SideBar";
import classes from "./MainNavigation.module.css";
import { motion } from "framer-motion";
import { uiActions } from "../../store/ui-slice";
import {useRouter} from 'next/router';
import { useSession } from "next-auth/react";

const MainNavigation = (props:MainNavigationInterface) =>{
    const [showSideBar, setShowSideBar] = useState(false);
    const [showDrawer, setShowDrawer] = useState(false);
    const router = useRouter();
    const notification = useAppSelector(state => state.ui.notification);
    const dispatch = useAppDispatch();
    const {data:session, status} = useSession();

    
    useEffect(
        () =>{
            if(status === 'authenticated'){
                if(window.innerWidth >= 600){
                    setShowSideBar(true);
                    
                }
                const windowResizeHandler = () =>{
                    if(window.innerWidth >= 600){
                        setShowSideBar(true);
                        setShowDrawer(false);
                    }else{
                        setShowSideBar(false);
                        setShowDrawer(true);
                    }
                }
                window.addEventListener('resize', windowResizeHandler);
                return(
                    () =>{
                        window.removeEventListener('resize', windowResizeHandler);
                    }
                )
            }
            
        },[status]
    )

    useEffect(
        () =>{
            if(notification.show){
                setTimeout(
                    () => {
                        dispatch(uiActions.showNotification({show:false, message:'', color:"green"}))
                    }, 4000
                )
            }
        },[notification.show]
    )

    useEffect(
        () =>{
            if(status === 'unauthenticated' || status === 'loading'){
                setShowSideBar(false);
                setShowDrawer(false);
                

            }
            if(status === 'authenticated' && window.innerWidth < 600){
                setShowDrawer(true);
                
            }
            
        },[status]
    )

    const onLinkClickHandler  = () =>{
        if(window.innerWidth < 600){
            setShowSideBar(false);
        }
        
    }

    const onDrawerToggle = () =>{
        setShowSideBar(!showSideBar);
        
    }

    
    return(
        <Fragment>
            <header>
                {status === 'authenticated' && <Header welcome_title='Bienvenido' 
                allowDrawer={showDrawer} 
                backgroundColor='#ECECEC'  onDrawerToggle={onDrawerToggle}/>}
                {status === 'unauthenticated' && <HomeHeader /> }
            </header>
            {notification.show && <Notification message={notification.message} color= {notification.color} />}
            
            <main className={classes.mainContent}>
                <div className={classes.container}>
                    {showSideBar && <div className={classes.sideBar}>
                        <SideBar toggleSideBar={showSideBar} onLinkClickHandler={onLinkClickHandler} />
                    </div>
                    }
                    <div className={classes.main}>
                        
                        {props.children}
                        
                    </div>
                </div>
            </main>
            <footer>
                
            </footer>
        </Fragment>
    )
}

export default MainNavigation;