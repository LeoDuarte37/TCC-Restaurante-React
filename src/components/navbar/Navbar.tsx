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

function Navbar() {

    const { usuario, handleLogout } = useContext(LoginContext);
    const { mesa } = useContext(MesaContext);

    return (
        <nav className="flex flex-wrap place-items-center">
            <div className="navbar max-[1000px]:justify-between justify-around">
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

                {(usuario.perfil === "CAIXA" || usuario.perfil === "ADMIN") &&
                    <div className="flex  items-center gap-4">
                        <CardapioButton class="cardapio" />

                        <div className="borda"></div>

                        <MeusPedidosButton />

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
    );
}

export default Navbar;