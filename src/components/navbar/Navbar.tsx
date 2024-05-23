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
        <nav className="flex flex-wrap place-items-center">
            <div className="navbar">
                <div className="logo">
                    <ChefHat size={50} color='white' />
                </div>

                <div className="componentes">
                    <Search />

                    <div className="borda"></div>

                    <ChamarGarcom />

                    <div className="borda"></div>

                    <MeusPedidos />

                    <div className="borda"></div>

                    <Conta />
                </div>
            </div>
        </nav>
    );
}

export default Navbar;