import { CardInterface } from "../../data/CardInterface"
import classes from './Card.module.css';

const Card = (props:CardInterface) => {
    return(
        <div className={classes.box}>
            {props.client}
        </div>
    )
}

export default Card;