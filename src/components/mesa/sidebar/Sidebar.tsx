import Cardapio from "../cardapio/Cardapio";
import Destaques from "../destaques/Destaques";
import "./Sidebar.css";

function Sidebar() {
    return (
        <div className="sidebar">
            <div className="produto">
                <Destaques />
                <hr />
                <Cardapio />
            </div>

            <div className="sobre">
                <p>Sobre</p>
            </div>
        </div>
    );
}

export default Sidebar;