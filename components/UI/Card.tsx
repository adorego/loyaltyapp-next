import { CardInterface } from "../../data/CardInterface"
const Card = (props:CardInterface) => {
    return(
        <div >
            {props.client}
        </div>
    )
}

export default Card;