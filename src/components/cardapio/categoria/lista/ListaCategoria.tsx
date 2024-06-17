import { useState, useContext } from "react";
import Categoria from "../../../../models/categoria/Categoria";
import { TailSpin } from 'react-loader-spinner';
import CardCategoria from "../card/CardCategoria";
import SubCategoria from "../../../../models/subcategoria/Subcategoria";
import { MesaContext } from "../../../../contexts/MesaContext";
import { Dialog, DialogPanel, Disclosure, DisclosureButton, DisclosurePanel, Transition, TransitionChild } from "@headlessui/react";
import { LoginContext } from "../../../../contexts/LoginContext";
import ListaSubcategoria from "../../subcategoria/lista/ListaSubcategoria";
import ListaProduto from "../../produto/lista/ListaProduto";
import FormCategoria from "../forms/FormCategoria";
import FormEditCategoria from "../forms/FormEditCategoria";
import { Pencil, Plus, X } from "@phosphor-icons/react";
import FormSubcategoria from "./../../subcategoria/forms/FormSubcategoria";
import ModalEditCategoria from "../modal/ModalEditCategoria";
import ModalAddSubcategoria from "../../subcategoria/modal/ModalAddSubcategoria";

function ListaCategoria() {

    const { mesa } = useContext(MesaContext);
    const { login } = useContext(LoginContext);

    const [categorias, setCategorias] = useState<Array<Categoria>>([
        {
            id: 1,
            nome: "Comidas",
            subCategoria: [
                {
                    id: 1,
                    nome: "Pratos especiais",
                    disponivel: true,
                    produto: [
                        {
                            id: 1,
                            nome: "Prato especial",
                            descricao: "Especial da casa! Acompanha... Especial da casa! Acompanha...",
                            foto: "https://http2.mlstatic.com/D_NQ_NP_984716-MLU74556662341_022024-O.webp",
                            valor: 25.99,
                            disponivel: true
                        },
                        {
                            id: 2,
                            nome: "Prato",
                            descricao: "Especial da casa! Acompanha... Especial da casa! Acompanha...",
                            foto: "https://http2.mlstatic.com/D_NQ_NP_984716-MLU74556662341_022024-O.webp",
                            valor: 25.99,
                            disponivel: true
                        },
                        {
                            id: 3,
                            nome: "Prato especial",
                            descricao: "Especial da casa! Acompanha... Especial da casa! Acompanha...",
                            foto: "https://http2.mlstatic.com/D_NQ_NP_984716-MLU74556662341_022024-O.webp",
                            valor: 25.99,
                            disponivel: true
                        },
                        {
                            id: 4,
                            nome: "Prato especial",
                            descricao: "Especial da casa! Acompanha... Especial da casa! Acompanha...",
                            foto: "https://http2.mlstatic.com/D_NQ_NP_984716-MLU74556662341_022024-O.webp",
                            valor: 25.99,
                            disponivel: true
                        },
                    ],
                },
                {
                    id: 2,
                    nome: "Lanches",
                    disponivel: true,
                    produto: [
                        {
                            id: 5,
                            nome: "Prato especial",
                            descricao: "Especial da casa! Acompanha... Especial da casa! Acompanha...",
                            foto: "https://http2.mlstatic.com/D_NQ_NP_984716-MLU74556662341_022024-O.webp",
                            valor: 25.99,
                            disponivel: true
                        },
                        {
                            id: 6,
                            nome: "Prato especial",
                            descricao: "Especial da casa! Acompanha... Especial da casa! Acompanha...",
                            foto: "https://http2.mlstatic.com/D_NQ_NP_984716-MLU74556662341_022024-O.webp",
                            valor: 25.99,
                            disponivel: true
                        },
                    ],
                },
            ],
            disponivel: true,
        },
        {
            id: 2,
            nome: "Bebidas",
            subCategoria: [
                {
                    id: 1,
                    nome: "Refrigerantes",
                    produto: [
                        {
                            id: 1,
                            nome: "Prato especial",
                            descricao: "Especial da casa! Acompanha... Especial da casa! Acompanha...",
                            foto: "https://http2.mlstatic.com/D_NQ_NP_984716-MLU74556662341_022024-O.webp",
                            valor: 25.99,
                            disponivel: true
                        }
                    ],
                    disponivel: true,
                },
                {
                    id: 1,
                    nome: "Alcoolicos",
                    produto: [
                        {
                            id: 1,
                            nome: "Prato especial",
                            descricao: "Especial da casa! Acompanha... Especial da casa! Acompanha...",
                            foto: "https://http2.mlstatic.com/D_NQ_NP_984716-MLU74556662341_022024-O.webp",
                            valor: 25.99,
                            disponivel: true
                        }
                    ],
                    disponivel: true,
                },
            ],
            disponivel: true,
        },
        {
            id: 3,
            nome: "Sobremesas",
            subCategoria: [
                {
                    id: 1,
                    nome: "Sorvetes",
                    produto: [
                        {
                            id: 1,
                            nome: "Prato especial",
                            descricao: "Especial da casa! Acompanha... Especial da casa! Acompanha...",
                            foto: "https://http2.mlstatic.com/D_NQ_NP_984716-MLU74556662341_022024-O.webp",
                            valor: 25.99,
                            disponivel: true
                        }
                    ],
                    disponivel: true,
                },
            ],
            disponivel: true,
        },
    ]);

    const [subCategoriaAtual, setSubCategoriaAtual] = useState<SubCategoria>(categorias[0].subCategoria[0]);

    function setInfoProdutos(subCategoria: SubCategoria) {
        setSubCategoriaAtual(subCategoria);
    }

    const [isOpen, setIsOpen] = useState<boolean>(false);

    const [isLoading, setIsLoading] = useState<boolean>(false);

    return (
        <>
            {isLoading ? (
                <div className="pt-8">
                    <TailSpin
                        visible={true}
                        height={100}
                        width={100}
                        color="#D42300"
                        ariaLabel="tail-spin-loading"
                        radius={1}
                        wrapperStyle={{}}
                        wrapperClass=""
                    />
                </div>
            ) : (
                <>
                    <ul className="flex flex-col gap-4 max-w-48 max-[1000px]:max-w-40 w-full p-4 h-4/5 overflow-auto">
                        {categorias.map((categoria) => (
                            <li key={categoria.id}>
                                <div className="w-full">
                                    <div className="mx-auto w-full max-w-lg divide-y divide-white/5 rounded-xl bg-white/5">
                                        <Disclosure as="div" className="" defaultOpen={true}>
                                            <DisclosureButton className="group flex w-full items-center gap-2 justify-between">
                                                <div className="flex border border-[#3B1206] rounded-lg w-full">
                                                    {(login.perfil === "ADMIN" || login.perfil === "ROOT") &&
                                                        <ModalEditCategoria categoria={categoria}/>
                                                    }

                                                    <CardCategoria categoria={categoria} />

                                                    {(login.perfil === "ADMIN" || login.perfil === "ROOT") && 
                                                        <ModalAddSubcategoria categoria={categoria}/>
                                                    }   
                                                </div>
                                            </DisclosureButton>
                                            <DisclosurePanel className="mt-4 text-md text-[#3B1206]">
                                                <ListaSubcategoria subcategorias={categoria.subCategoria} setInfo={setInfoProdutos} />
                                            </DisclosurePanel>
                                        </Disclosure>
                                    </div>
                                </div>
                            </li>
                        ))}
                        {(login.perfil === "ADMIN" || login.perfil === "ROOT") &&
                            <li key={"NovaCategoria"} onClick={() => setIsOpen(true)} className="bg-[#D42300] hover:bg-[#b51f02] mb-4 text-white text-center font-semibold py-1 px-2 rounded h-8">
                                Nova categoria
                            </li>
                        }
                    </ul>

                    <div className="bg-[#3B1206] w-1 h-full"></div>

                    <div className="flex flex-col p-4 w-full h-full bg-[#f8f8f8] max-w-[50%] max-[1000px]:max-w-full">
                        <ListaProduto subcategoria={subCategoriaAtual} />
                    </div>

                    <Transition appear show={isOpen} >
                        <Dialog as="div" className="absolute inset-0 z-10 p-10 w-screen focus:outline-none"
                            onClose={() => setIsOpen(false)}>

                            <div className="flex min-h-full w-full items-center justify-center">
                                <TransitionChild
                                    enter="ease-out duration-200"
                                    enterFrom="opacity-0 transform-[scale(95%)]"
                                    enterTo="opacity-100 transform-[scale(100%)]"
                                    leave="ease-in duration-200"
                                    leaveFrom="opacity-100 transform-[scale(100%)]"
                                    leaveTo="opacity-0 transform-[scale(95%)]"
                                >
                                    <DialogPanel className="flex justify-center rounded-xl h-full w-full max-[440px]:max-w-full max-w-xl p-10 max-[440px]:p-2">

                                        <div className="flex h-full w-full">
                                            <div className="flex justify-center items-center max-h-[20rem] modalItemPedido rounded-xl max-[440px]:p-2">
                                                <div className="flex w-full h-8 my-2">
                                                    <h1 className="text-[#D42300] ml-6 text-center w-full subCategoriaTitle text-2xl font-bold">
                                                        Nova Categoria 
                                                    </h1>
                                                    <X size={32} color="#3B1206" className="" onClick={() => setIsOpen(false)} />
                                                </div>
                                                <div className="w-full max-w-full flex-1 flex-col justify-center rounded-xl bg-white/5 border-2 border-[#F5EBDC] overflow-hidden backdrop-blur-2xl">
                                                    <FormCategoria />
                                                </div>
                                            </div>
                                        </div>
                                    </DialogPanel>
                                </TransitionChild>
                            </div>
                        </Dialog>
                    </Transition>
                </>
            )}
        </>
    );
}

export default ListaCategoria;