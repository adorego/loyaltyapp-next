import { Fragment, useEffect, useRef, useState } from "react";

import Button from "../UI/Button";
import {FaBars} from "react-icons/fa";
import Image from 'next/Image';
import SideBar from "./SideBar";
import classes from "./Header.module.css";
import logo from '../../public/images/logo_2.png';
import { motion } from "framer-motion";
import {useAppSelector} from "../../hooks/store-hooks";
import {useRouter} from 'next/router';
import { useSession } from "next-auth/react";

export interface HeaderInterface{
    welcome_title: string;
    backgroundColor:string;
    logoSrc?:string;
    allowDrawer:boolean;
    onDrawerToggle:()=>void;
    
}

const Header = (props:HeaderInterface) =>{
    const {data:session, status} = useSession();
    const router = useRouter();
    const isAuthenticated = status === 'authenticated';
    const toggleSideBar = () =>{
       props.onDrawerToggle();
    }
    return(
        <Fragment>
            <nav className={classes.header}>
                    <div className={classes.logo}>
                        <Image src={logo} 
                        alt='Logo of LoyaltyAPP' 
                        layout="responsive"
                        priority={true}
                         />
                    </div>
                    {props.allowDrawer && <div className={classes.hamburger}>
                        <FaBars className={classes.bars} onClick={toggleSideBar} />
                    </div>}
                    
                    
                    
                
                    
                
            
                        

            
                
            </nav>
       
        </Fragment>
    )
}

export default Header;