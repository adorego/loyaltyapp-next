import React, {Component, Fragment, ReactNode} from "react";

import Button from "../UI/Button";
import Image from "next/Image";
import Link from "next/link";
import classes from "./HomeHeader.module.css";
import logo from '../../public/images/logo_2.png';
import {useRouter} from 'next/router';

const HomeHeader = () =>{
    const router = useRouter();

    const onLogoClickHandler = () =>{
        router.push('/');
    }
    return(
        <Fragment>
                <nav className={classes.container}>
                    <div className={classes.logo}>
                        <Image src={logo} 
                        alt='Logo of LoyaltyAPP' 
                        layout="responsive"
                        priority={true}
                        onClick={onLogoClickHandler}
                         />
                    </div>
                    <div className={classes.links}>
                        <ul>
                            <li><Link href={'/#como_funciona'}><a>Cómo funciona ?</a></Link></li>
                            <li><Link href={'/#cuanto_cuesta'}><a>Cuanto cuesta ?</a></Link></li>
                            <li><Link href={'/#contacto'}><a>Contacto</a></Link></li>
                        </ul>
                    </div>
                    <Link href='/login'>
                        <a style={{color:"var(--secondary-color)"}}>Ingresar</a>
                    </Link>
                            
                    
                </nav>
                <nav className={classes.mobileLinks}>
                        <ul>
                            <li><Link href={'/#como_funciona'}><a>Cómo funciona ?</a></Link></li>
                            <li><Link href={'/#cuanto_cuesta'}><a>Cuanto cuesta ?</a></Link></li>
                            <li><Link href={'/#contacto'}><a>Contacto</a></Link></li>
                        </ul>
                </nav>
            </Fragment>
    )
}


export default HomeHeader;