import { ReactNode, forwardRef } from "react";

import classes from './SideBarLink.module.css';

interface SideBarLinkProps{
    onClick:() => void;
    href?:string;
    label:string;
    icon:ReactNode;
}
  

const SideBarLink = forwardRef<HTMLAnchorElement, SideBarLinkProps>((props, ref) => {
    const {onClick, href, label, icon} = props;
    
    return(
      <a className={classes.Link}  href={href} onClick={onClick} ref={ref}>
        {icon}&nbsp;&nbsp;&nbsp;{label}
      </a>
    )
})

SideBarLink.displayName = 'SideBarLink';

export default SideBarLink;