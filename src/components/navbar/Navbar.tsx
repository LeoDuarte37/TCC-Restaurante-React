import { useContext, useState } from "react";
import ChamarGarcomButton from "../mesa/buttons/ChamarGarcomButton";
import ContaButton from "../mesa/buttons/ContaButton";
import MeusPedidosButton from "../mesa/buttons/MeusPedidosButton";
import SearchButton from "../mesa/buttons/SearchButton";
import "./Navbar.css";
import { ChefHat, SignOut } from "@phosphor-icons/react";
import { LoginContext } from "../../contexts/LoginContext";
import { MesaContext } from "../../contexts/MesaContext";
import MenuHamburguer from "./buttons/MenuHamburguer";

function Navbar() {

    const { usuario, handleLogout } = useContext(LoginContext);
    const { mesa } = useContext(MesaContext);



    return (
        <nav className="flex flex-wrap place-items-center">
            <div className="navbar">
                <div className="logo">
                    <ChefHat size={50} color='white' className="w-full" />
                </div>

                {usuario.perfil == "COZINHA" &&
                    <>
                        <h1 className="text-slate-200 font-bold text-center text-2xl max-[540px]:text-lg">
                            Chegada de Pedidos
                        </h1>
                        <div className="w-full max-w-16 max-[540px]:max-w-20 flex justify-center">
                            <SignOut size={38} color="white" onClick={handleLogout} />
                        </div>
                    </>
                }

                {usuario.perfil === "GARCOM" &&
                    <div className="flex justify-center w-24">
                        <MenuHamburguer />
                    </div>
                }

                {mesa.id > 0 &&
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