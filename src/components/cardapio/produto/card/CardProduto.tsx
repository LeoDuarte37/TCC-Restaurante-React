import { useContext, useState } from "react";
import usePedido from "../../../../hooks/usePedido";
import Item from "../../../../models/pedido/item/Item";
import Produto from "../../../../models/produto/Produto";
import toastAlert from "../../../../utils/toastAlert";
import { LoginContext } from "../../../../contexts/LoginContext";
import { Transition, Dialog, TransitionChild, DialogPanel } from "@headlessui/react";
import { X } from "@phosphor-icons/react";
import FormEditProduto from "../forms/FormEditProduto";

function CardProduto(props: { produto: Produto }) {

    const { login } = useContext(LoginContext);
    const { addToPedido } = usePedido();

    function handleClickAddToPedido() {
        const item: Item = {
            produto: props.produto,
            quantidade: 1,
        };

        try {
            addToPedido(item);
            toastAlert("Item adicionado!", "sucesso");
        } catch (error) {
            toastAlert("Erro ao adicionar item. Por favor, tente novamente.", "erro");
        }
    }

    const [isOpen, setIsOpen] = useState<boolean>(false);

    return (
        <>
            <div className="relative flex flex-row bg-clip-border rounded-xl bg-[#F8F8F8] border-2 border-[#F5EBDC] shadow-inner w-full h-36">
                <div
                    className="relative max-w-40 m-0 overflow-hidden bg-white rounded-r-none bg-clip-border rounded-xl shrink-0">
                    <img
                        src={props.produto.foto}
                        alt="card-image" className="object-cover w-full h-full" />
                </div>
                <div className="px-3 py-2 w-full h-full flex flex-col justify-between gap-2">
                    <div className="flex justify-between w-full">
                        <h4 className="block font-sans text-lg antialiased font-bold leading-snug tracking-normal text-[#3B1206]">
                            {props.produto.nome}
                        </h4>

                        <p className="text-[#3B1206]">
                            <span className="font-bold">R$ {props.produto.valor}</span>
                        </p>
                    </div>
                    <p className="block h-full overflow-hidden text-base leading-5 antialiased font-normal text-justify text-[#3B1206]">
                        {props.produto.descricao}
                    </p>

                    <div className="flex justify-end items-end h-8">
                        {(login.perfil === "CAIXA" || login.perfil === "ADMIN" || login.perfil === "ROOT")
                            ? <button onClick={() => setIsOpen(true)} className="bg-[#D42300] hover:bg-[#b51f02] text-white font-semibold py-1 px-2 rounded h-8">
                                Editar produto
                            </button>

                            : <button onClick={handleClickAddToPedido} className="bg-[#D42300] hover:bg-[#b51f02] text-white font-semibold py-1 px-2 rounded h-8">
                                Adicionar
                            </button>
                        }
                    </div>
                </div>
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
                            <DialogPanel className="flex justify-center rounded-xl h-full w-full max-[440px]:max-w-full max-w-[60%] p-10 max-[440px]:p-2">

                                <div className="container h-full w-full flex justify-center items-center">
                                    <div className="modalItemPedido rounded-xl max-[440px]:p-2">
                                        <div className="flex justify-between my-2">
                                            <h1 className="text-[#D42300] ml-6 text-center w-full subCategoriaTitle text-2xl font-bold">
                                                Editar Produto 
                                            </h1>
                                            <X size={32} color="#3B1206" onClick={() => setIsOpen(false)} />
                                        </div>
                                        <div className="div rounded-xl bg-white/5 border-2 border-[#F5EBDC] overflow-hidden backdrop-blur-2xl w-full flex-1 flex-col justify-center">
                                            {<FormEditProduto produto={props.produto} />}
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

export default CardProduto;