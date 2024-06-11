import { BookOpenText } from "@phosphor-icons/react";
import "./../../../App.css";

function CardapioButton(props : { class: string}) {
    return (
        <div className={props.class}>
            <BookOpenText size={32} />
            <p>Cardápio</p>
        </div>
    )
}

export default CardapioButton;