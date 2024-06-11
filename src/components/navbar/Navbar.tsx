import { useContext, useState } from "react";
import ChamarGarcomButton from "../mesa/buttons/ChamarGarcomButton";
import ContaButton from "../mesa/buttons/ContaButton";
import MeusPedidosButton from "../mesa/buttons/MeusPedidosButton";
import SearchButton from "../mesa/buttons/SearchButton";
import "./../../App.css";
import { ChefHat, SignOut } from "@phosphor-icons/react";
import { LoginContext } from "../../contexts/LoginContext";
import { MesaContext } from "../../contexts/MesaContext";
import MenuHamburguer from "./buttons/MenuHamburguer";
import { useLocation } from "react-router-dom";
import CardapioButton from "../mesa/buttons/CardapioButton";
import MesasButton from "./buttons/MesasButton";

function Navbar() {

    const { usuario, handleLogout } = useContext(LoginContext);
    const { mesa } = useContext(MesaContext);

    const currentUrl = useLocation();
    let namePage: string = "";

    switch (currentUrl.pathname) {
        case "/pedidos":
            namePage = "Histórico de Pedidos";
            break;
    }

    return (
        <nav className="flex flex-wrap place-items-center">
            <div className="navbar">
                <div className="logo">
                    <ChefHat size={50} color='#f8f8f8' />
                </div>

                {usuario.perfil == "COZINHA" &&
                    <>
                        <h1 className="text-[#F8F8F8] subCategoriaTitle font-bold text-center text-3xl max-[540px]:text-lg">
                            Chegada de Pedidos
                        </h1>
                        <div className="w-full max-w-16 max-[540px]:max-w-20 flex justify-center">
                            <SignOut size={38} color="white" onClick={handleLogout} />
                        </div>
                    </>
                }

                {usuario.perfil === "GARCOM" &&
                    <div className="flex justify-end">
                        <MenuHamburguer />
                    </div>
                }

                {(usuario.perfil === "CAIXA" || usuario.perfil === "GERENTE" || usuario.perfil === "ADMIN") &&
                    <>
                        <div className="w-full flex justify-center">
                            <h1 className="text-[#F8F8F8] w-full ml-28 subCategoriaTitle font-bold text-center text-3xl max-[540px]:text-lg">
                                {/* { namePage } */}
                                Histórico de pedidos
                            </h1>
                        </div>

                        <div className="flex  items-center gap-4">
                            <CardapioButton class="cardapio" />

                            <div className="borda"></div>

                            <MeusPedidosButton />

                            <div className="borda"></div>

                            <MesasButton />
                        </div>
                    </>
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