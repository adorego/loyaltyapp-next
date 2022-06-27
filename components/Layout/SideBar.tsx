import { AnimatePresence, motion, useCycle } from 'framer-motion';
import { FaAward, FaBullhorn, FaChartBar, FaCircleNotch, FaPlaneArrival, FaTools, FaTrophy } from 'react-icons/fa';
import React, { Fragment, forwardRef, useEffect, useState } from 'react';
import {signOut, useSession} from 'next-auth/react';

import Link from 'next/link';
import SideBarInterface from '../../data/SideBar-interface';
import SideBarLink from './SideBarLink';
import classes from './SideBar.module.css';
import { fetchAuthData } from '../../store/auth-actions';
import { uiActions } from '../../store/ui-slice';
import { useAppDispatch } from '../../hooks/store-hooks';
import { useAppSelector } from '../../hooks/store-hooks';
import { useRouter } from 'next/router';

const navVariants = {
  closed:{
    x:0,
    opacity:0
  },
  open:{
    opacity:1
  }
}

const sideVariants = {
    closed: {
      
      transition: {
        staggerChildren: 0.2,
        staggerDirection: -1
      }
    },
    open: {
      
      transition: {
        staggerChildren: 0.2,
        staggerDirection: 1
      }
    }
};

const itemVariants = {
    closed: {
      opacity: 0
    },
    open: { opacity: 1 }
};




const SideBar = (props:SideBarInterface) =>{
    const router = useRouter();
    const dispatch = useAppDispatch();
    const universitySigla = useAppSelector(state => state.auth.university.sigla);
    const {data:session, status} = useSession()

    useEffect(
      () =>{
        if(!universitySigla){
          (session && session.user && session.user.email) ? dispatch(fetchAuthData(session?.user?.email)) : router.push('/logout');
        }
      },[]
    )

    const onClick = () =>{
      props.onLinkClickHandler();
    }

    
   
    return(
        
        <motion.aside className={`${classes.container} light-shadow`}
        initial="closed"
        animate={props.toggleSideBar ? "open" : "closed"}
        variants={navVariants}
        >
            <motion.ul className={classes.list}
                initial="closed"
                animate="open"
                variants={sideVariants}>
                <motion.li className={classes.li} variants={itemVariants}>
                   <Link href={universitySigla ? `/${universitySigla}/configuration/reportes` : ''}  passHref>
                        <SideBarLink label='Reportes' onClick={onClick} icon={<FaChartBar />} />
                    </Link>
                </motion.li>
                <motion.li className={classes.li} variants={itemVariants}>
                   <Link href={universitySigla ? `/${universitySigla}/configuration/campanas` : ''}  passHref>
                        <SideBarLink label='Campañas' onClick={onClick} icon={<FaBullhorn />} />
                    </Link>
                </motion.li>
                <motion.li className={classes.li} variants={itemVariants}>
                   <Link href={universitySigla ? `/${universitySigla}/configuration/beneficios` : ''}  passHref>
                         <SideBarLink label='Beneficios' onClick={onClick} icon={<FaTrophy />} />
                    
                   </Link>
                </motion.li>
                <motion.li className={classes.li} variants={itemVariants}>
                   <Link href={universitySigla ?  `/${universitySigla}/configuration/landing` : ''}  passHref>
                         <SideBarLink label='Landings' onClick={onClick} icon={<FaPlaneArrival />} />
                    
                   </Link>
                </motion.li>
                <motion.li className={classes.li} variants={itemVariants}>
                   <Link href={universitySigla ? `/${universitySigla}/configuration/premios`: ''}  passHref>
                        <SideBarLink label='Premios' onClick={onClick} icon={<FaAward />} />
                   </Link>
                </motion.li>
                <motion.li className={classes.li} variants={itemVariants}>
                   <Link href={universitySigla ? `/${universitySigla}/configuration/` : ''}  passHref>
                        <SideBarLink label='Configuración' onClick={onClick} icon={<FaTools/>} />
                   </Link>
                </motion.li>
                <motion.li className={classes.li} variants={itemVariants}>
                  <Link href={'/logout'}  passHref>
                        <SideBarLink label='Salir' onClick={onClick} icon={<FaCircleNotch />} />
                  </Link>
                </motion.li>
            </motion.ul>

        </motion.aside>
       
        
    )
}
export default SideBar;