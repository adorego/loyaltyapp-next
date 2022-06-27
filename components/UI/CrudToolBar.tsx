import { FaPen, FaTrash } from 'react-icons/fa';

import CrudToolBarInterface from '../../data/UI/CrudToolBar-interface';
import classes from './CrudToolBar.module.css';

const CrudToolBar = (props:CrudToolBarInterface) =>{
    return(
        <div className={classes.container}>
            <div className={classes.IconContainer}>
                <FaPen className={classes.icon} onClick={props.onEditHandler}/>
            </div>
            <div className={classes.IconContainer}>
                <FaTrash className={classes.icon} onClick={props.onDeleteHandler}/>
            </div>

        </div>
    )
}
export default CrudToolBar;