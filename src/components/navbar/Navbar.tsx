import { useContext } from "react";
import ChamarGarcomButton from "./buttons/ChamarGarcomButton";
import ContaButton from "./buttons/ContaButton";
import MeusPedidosButton from "./buttons/MeusPedidosButton";
import SearchButton from "./buttons/SearchButton";
import "./../../App.css";
import { ChefHat, SignOut } from "@phosphor-icons/react";
import { LoginContext } from "../../contexts/LoginContext";
import { MesaContext } from "../../contexts/MesaContext";
import MenuHamburguer from "./buttons/MenuHamburguer";
import CardapioButton from "./buttons/CardapioButton";
import MesasButton from "./buttons/MesasButton";
import { useLocation } from "react-router-dom";

function Navbar() {

    const { login, handleLogout } = useContext(LoginContext);
    const { mesa } = useContext(MesaContext);

    const local = useLocation();

    return (
        <>
            {local.pathname === '/' ? <></>
                : <nav className="flex flex-wrap place-items-center">
                    <div className="navbar max-[1000px]:justify-between justify-around">
                        <div className="logo">
                            <ChefHat size={50} color='#f8f8f8' />
                        </div>

                        {login.perfil == "COZINHA" &&
                            <>
                                <h1 className="text-[#F8F8F8] subCategoriaTitle font-bold text-center text-3xl max-[540px]:text-lg">
                                    Chegada de Pedidos
                                </h1>
                                <div className="w-full max-w-16 max-[540px]:max-w-20 flex justify-center">
                                    <SignOut size={38} color="white" onClick={handleLogout} />
                                </div>
                            </>
                        }

                        {login.perfil === "GARCOM" &&
                            <div className="flex justify-end">
                                <MenuHamburguer />
                            </div>
                        }

                        {(login.perfil === "CAIXA" || login.perfil === "ADMIN") &&
                            <div className="flex  items-center gap-4">
                                <MeusPedidosButton />

                                <div className="borda"></div>

                                <CardapioButton class="cardapio" />

                                <div className="borda"></div>

                                <MesasButton />
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
            }
        </>
    );
}

export default Navbar;