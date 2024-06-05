import { Button, Transition, Dialog, TransitionChild, DialogPanel } from "@headlessui/react";
import { X } from "@phosphor-icons/react";
import { useState } from "react";
import Pedido from "../../../models/Pedido";

function CardPedido(props: { pedido: Pedido }) {
    
    const [isOpen, setIsOpen] = useState<boolean>(false);

    return (
        <>
            <th scope="row" className="flex justify-center items-center w-full font-medium text-gray-900 whitespace-nowrap dark:text-white">
                { props.pedido.id }
            </th>
            <td className="flex justify-center items-center w-full font-medium text-gray-900 whitespace-nowrap dark:text-white">
                { props.pedido.mesa.numero }
            </td>
            <td className="flex justify-center items-center w-full font-medium text-gray-900 whitespace-nowrap dark:text-white">
                { props.pedido.data }
            </td>
            <td className="flex justify-center items-center w-full font-medium text-gray-900 whitespace-nowrap dark:text-white">
                { props.pedido.status }
            </td>
            <td className="flex justify-center w-full">
                <Button onClick={() => setIsOpen(true)} className="button w-32 h-12 flex items-center">
                    Ver itens
                </Button>
            </td>

            <Transition appear show={isOpen}>
                <Dialog as="div" className="absolute inset-0 z-10 w-screen focus:outline-none" onClose={() => setIsOpen(false)}>
                    
                        <div className="flex min-h-full w-full items-center justify-center">
                            <TransitionChild
                                enter="ease-out duration-200"
                                enterFrom="opacity-0 transform-[scale(95%)]"
                                enterTo="opacity-100 transform-[scale(100%)]"
                                leave="ease-in duration-200"
                                leaveFrom="opacity-100 transform-[scale(100%)]"
                                leaveTo="opacity-0 transform-[scale(95%)]"
                            >
                                <DialogPanel className="rounded-xl h-3/4 w-3/4 max-w-3xl px-2 py-2">

                                    <div className="container h-full w-full flex justify-center items-center">
                                        <div className="flex flex-col w-full h-[30rem] rounded-xl bg-slate-500 px-6 pb-6 max-[460px]:p-4">
                                            <div className="flex justify-end my-2">
                                                <X size={32} color="white" onClick={() => setIsOpen(false)} />
                                            </div>
                                            <div className="div rounded-xl bg-white/5 backdrop-blur-2xl w-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
                                                <h1>Ola</h1>
                                                {/* LISTA PEDIDOS, PASSANDO PAGE="Cozinha" */}
                                            </div>
                                        </div>
                                    </div>

                                </DialogPanel>
                            </TransitionChild>
                        </div>
                    
                </Dialog>
            </Transition>
        </>          
    );
}

export default CardPedido;