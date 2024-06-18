import { Link } from "react-router-dom";
import CardapioButton from "../navbar/buttons/CardapioButton";
// import DestaquesButton from "../buttons/DestaquesButton";
import "./Sidebar.css";

function Sidebar() {
    return (
        <div className="sidebar">
            <div className="produto">
                <hr />
                <Link to={"/mesa/cardapio"}>
                    <CardapioButton class="cardapioMesa" />
                </Link>
                <hr />
            </div>

            <div className="sobre">
                <p>Sobre</p>
            </div>
        </div>
    );
}

export default Sidebar;