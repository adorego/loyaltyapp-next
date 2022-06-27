import Button from '../UI/Button';
import { FaAngleLeft } from 'react-icons/fa';
import classes from './TopPage.module.css';
import {useRouter} from 'next/router';

const TopPage = () =>{
    const router = useRouter();
    
    const onReturnHandler = () =>{
        router.back();
    }


    return(
        <div className={classes.container}>
            <FaAngleLeft onClick={onReturnHandler} className={classes.returnIcon}/>
        </div>
    )
}

export default TopPage;