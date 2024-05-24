import BotaoCardapio from "../botoes/Cardapio";
import Destaques from "../botoes/Destaques";
import "./Sidebar.css";

function Sidebar() {
    return (
        <div className="sidebar">
            <div className="produto">
                <BotaoCardapio />
            </div>

            <div className="sobre">
                <p>Sobre</p>
            </div>
        </div>
    );
}

export default Sidebar;