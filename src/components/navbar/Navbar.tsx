import { useContext } from "react";
import ChamarGarcomButton from "../mesa/buttons/ChamarGarcomButton";
import ContaButton from "../mesa/buttons/ContaButton";
import MeusPedidosButton from "../mesa/buttons/MeusPedidosButton";
import SearchButton from "../mesa/buttons/SearchButton";
import "./Navbar.css";
import { ChefHat, SignOut } from "@phosphor-icons/react";
import { LoginContext } from "../../contexts/LoginContext";

function Navbar() {

    const { usuario, isMesa, handleLogout } = useContext(LoginContext);

    return (
        <nav className="flex flex-wrap place-items-center">
            <div className="navbar">
                <div className="logo">
                    <ChefHat size={50} color='white' />
                </div>

                { usuario.perfil == "COZINHA" && 
                    <>
                        <h1 className="text-slate-200 font-bold text-2xl">
                            Chegada de Pedidos
                        </h1>
                        <div className="w-full max-w-16">
                            <SignOut size={38} color="white" onClick={handleLogout} />
                        </div>
                    </>    
                }

                { isMesa && 
                    <div className="componentes">
                        <SearchButton />

                        <div className="borda"></div>

                        <ChamarGarcomButton />

                        <div className="borda"></div>

                        <MeusPedidosButton />

                        <div className="borda"></div>

                        <ContaButton />
                    </div>
                }
            </div>
        </nav>
    );
}

export default Navbar;