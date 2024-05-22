import Cardapio from "../mesa/cardapio/Cardapio";
import ChamarGarcom from "../mesa/chamarGarcom/ChamarGarcom";
import Conta from "../mesa/conta/Conta";
import Destaques from "../mesa/destaques/Destaques";
import MeusPedidos from "../mesa/meusPedidos/MeusPedidos";
import Search from "../mesa/search/Search";
import "./Navbar.css";
import { ChefHat } from "@phosphor-icons/react";

function Navbar() {

    return (
        <nav>
            <div className="navbar">
                <div className="logo">
                    <ChefHat size={45} color='white' />
                </div>

                <Search />

                <ChamarGarcom />

                <MeusPedidos />

                <Conta />
            </div>

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
        </nav>
    );
}

export default Navbar;