import ChamarGarcomButton from "../mesa/buttons/ChamarGarcomButton";
import ContaButton from "../mesa/buttons/ContaButton";
import MeusPedidosButton from "../mesa/buttons/MeusPedidosButton";
import SearchButton from "../mesa/buttons/SearchButton";
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
                    <SearchButton />

                    <div className="borda"></div>

                    <ChamarGarcomButton />

                    <div className="borda"></div>

                    <MeusPedidosButton />

                    <div className="borda"></div>

                    <ContaButton />
                </div>
            </div>
        </nav>
    );
}

export default Navbar;