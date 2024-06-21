import { useState, useContext } from "react";
import CardCategoria from "../card/CardCategoria";
import { Disclosure, DisclosureButton, DisclosurePanel } from "@headlessui/react";
import { LoginContext } from "../../../../contexts/LoginContext";
import ListaSubcategoria from "../../subcategoria/lista/ListaSubcategoria";
import ListaProduto from "../../produto/lista/ListaProduto";
import ModalEditCategoria from "../modal/ModalEditCategoria";
import ModalAddSubcategoria from "../../subcategoria/modal/ModalAddSubcategoria";
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
                                    <Disclosure as="div" className="" defaultOpen={true}>
                                        <DisclosureButton className="group flex w-full items-center gap-2 justify-between">
                                            <div className="flex border border-[#3B1206] rounded-lg w-full">
                                                {(login.perfil === "ADMIN" || login.perfil === "ROOT") &&
                                                    <ModalEditCategoria categoria={categoria} />
                                                }

                                                <CardCategoria categoria={categoria} />

                                                {(login.perfil === "ADMIN" || login.perfil === "ROOT") &&
                                                    <ModalAddSubcategoria categoria={categoria} />
                                                }
                                            </div>
                                        </DisclosureButton>
                                        <DisclosurePanel className="mt-4 text-md text-[#3B1206]">
                                            <ListaSubcategoria subcategorias={categoria.subcategoria} />
                                        </DisclosurePanel>
                                    </Disclosure>
                                </div>
                            </div>
                        </li>

                        :  <> {(categoria.subcategoria.length > 0 && categoria.disponivel == true) && 
                                <li key={categoria.id}>
                                    <div className="w-full">
                                        <div className="mx-auto w-full max-w-lg divide-y divide-white/5 rounded-xl bg-white/5">
                                            <Disclosure as="div" className="" defaultOpen={true}>
                                                <DisclosureButton className="group flex w-full items-center gap-2 justify-between">
                                                    <div className="flex border border-[#3B1206] rounded-lg w-full">
                                                        <CardCategoria categoria={categoria} />
                                                    </div>
                                                </DisclosureButton>
                                                <DisclosurePanel className="mt-4 text-md text-[#3B1206]">
                                                    <ListaSubcategoria subcategorias={categoria.subcategoria} />
                                                </DisclosurePanel>
                                            </Disclosure>
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