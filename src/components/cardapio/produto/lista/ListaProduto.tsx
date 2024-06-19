import { useContext, useEffect, useState } from "react";
import { LoginContext } from "../../../../contexts/LoginContext";
import CardProduto from "../card/CardProduto";
import { Dialog, DialogPanel, Transition, TransitionChild } from "@headlessui/react";
import { X } from "@phosphor-icons/react";
import Subcategoria from "../../../../models/subcategoria/Subcategoria";
import FormProduto from "../forms/FormProduto";
import ModalEditSubcategoria from "../../subcategoria/modal/ModalEditSubcategoria";

function ListaProduto(props: { subcategoria: Subcategoria }) {

    const { login } = useContext(LoginContext);

    const [isOpen, setIsOpen] = useState<boolean>(false);

    const [subcategoria, setSubcategoria] = useState<Subcategoria>(props.subcategoria)

    useEffect(() => {
        setSubcategoria(props.subcategoria);
    }, [props.subcategoria])

    return (
        <>
            <div className="flex justify-between items-center">
                <h2 className="text-[#D42300] text-start mb-4 subCategoriaTitle">{subcategoria && subcategoria.nome}</h2>

                {(login.perfil === "ADMIN" || login.perfil === "ROOT") &&
                    <div className="flex gap-2">
                        <ModalEditSubcategoria subcategoria={subcategoria}/>

                        <button onClick={() => setIsOpen(true)} className="bg-[#D42300] hover:bg-[#b51f02] mb-3 text-white font-semibold py-1 px-2 rounded h-8">
                            Novo Produto
                        </button>
                    </div>
                }
            </div>
                    
            <ul className="flex flex-col gap-6 w-full h-3/4 pb-4 overflow-auto">
                {subcategoria && subcategoria.produto.map((produto) => (
                    <li key={produto.id}>
                        <CardProduto produto={produto} />
                    </li>
                ))}
            </ul>

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
                            <DialogPanel className="flex justify-center rounded-xl h-full w-full max-[440px]:max-w-full max-w-[60%] p-10 max-[440px]:p-2 overflow-hidden">

                                <div className="container h-full w-full flex justify-center items-center">

                                    <div className="modalItemPedido rounded-xl max-[440px]:p-2">
                                        <div className="flex justify-between w-full my-2">
                                            <h1 className="text-[#D42300] ml-6 text-center w-full subCategoriaTitle text-2xl font-bold">
                                                Novo Produto
                                            </h1>
                                            <X size={32} color="#3B1206" onClick={() => setIsOpen(false)} />
                                        </div>
                                        <div className="rounded-xl bg-white/5 border-2 border-[#F5EBDC] overflow-hidden backdrop-blur-2xl w-full flex-1 flex-col justify-center">
                                            <FormProduto subcategoria={subcategoria} />
                                        </div>
                                    </div>
                                </div>
                            </DialogPanel>
                        </TransitionChild>
                    </div>
                </Dialog>
            </Transition>
        </>
    )
}

export default ListaProduto;