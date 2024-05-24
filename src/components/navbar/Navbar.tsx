import ChamarGarcom from "../mesa/botoes/ChamarGarcom";
import Conta from "../mesa/botoes/Conta";
import MeusPedidos from "../mesa/botoes/MeusPedidos";
import Search from "../mesa/botoes/Search";
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