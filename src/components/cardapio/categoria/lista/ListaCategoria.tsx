import { useState, useContext } from "react";
import CardCategoria from "../card/CardCategoria";
import { LoginContext } from "../../../../contexts/LoginContext";
import ListaProduto from "../../produto/lista/ListaProduto";
import { CardapioContext } from "../../../../contexts/CardapioContext";
import ModalAddCategoria from "../modal/ModalAddCategoria";

function ListaCategoria() {
    const { login } = useContext(LoginContext);
    const { categorias } = useContext(CardapioContext);

    const [isOpen, setIsOpen] = useState<boolean>(false);

    return (
        <>
            <ul className="flex flex-col gap-4 max-w-48 max-[1000px]:max-w-40 w-full p-4 h-4/5 overflow-auto">
                {categorias.map((categoria) => (
                    <> {login.token != '' ?
                        <li key={categoria.id}>
                            <div className="w-full">
                                <div className="mx-auto w-full max-w-lg divide-y divide-white/5 rounded-xl bg-white/5">
                                    <CardCategoria categoria={categoria} />
                                </div>
                            </div>
                        </li>

                        : <> 
                            {(categoria.disponivel == true && categoria.subcategoria[0]?.produto.length > 0) &&
                                <li key={categoria.id}>
                                    <div className="w-full">
                                        <div className="mx-auto w-full max-w-lg divide-y divide-white/5 rounded-xl bg-white/5">
                                            <CardCategoria categoria={categoria} />
                                        </div>
                                    </div>
                                </li>
                            }
                        </>
                    }</>
                ))}
                {(login.perfil === "ADMIN" || login.perfil === "ROOT") &&
                    <li key={"NovaCategoria"} onClick={() => setIsOpen(true)} className="bg-[#D42300] hover:bg-[#b51f02] mb-4 text-white text-center font-semibold py-1 px-2 rounded h-8">
                        Nova categoria
                    </li>
                }
            </ul>

            <div className="bg-[#3B1206] w-1 h-full"></div>

            <div className="flex flex-col p-4 w-full h-full bg-[#f8f8f8] max-w-[50%] max-[1000px]:max-w-full">
                <ListaProduto />
            </div>

            <ModalAddCategoria isOpen={isOpen} setIsOpen={setIsOpen} />
        </>
    );
}

export default ListaCategoria;