import { Dialog, DialogPanel, Transition, TransitionChild } from "@headlessui/react";
import { X } from "@phosphor-icons/react";
import { Note } from "@phosphor-icons/react";
import { useState } from "react";
import ListaPedido from "../../pedido/lista/ListaPedido";

function MeusPedidosButton() {

    const [open, setOpen] = useState<boolean>(false);

    return (
        <>
            <div className="meusPedidos" onClick={() => setOpen(!open)}>
                <Note size={32} color="white" />
                <p>Meus pedidos</p>
            </div>

            <Transition appear show={open}>
                <Dialog className="relative z-10" onClose={setOpen}>
                    <TransitionChild
                        enter="ease-out duration-300"
                        enterFrom="opacity-0 transform-[scale(95%)]"
                        enterTo="opacity-100 transform-[scale(100%)]"
                        leave="ease-in duration-200"
                        leaveFrom="opacity-100 transform-[scale(100%)]"
                        leaveTo="opacity-0 transform-[scale(95%)]"
                    >
                        <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
                    </TransitionChild>

                    <div className="fixed inset-0 overflow-hidden">
                        <div className="absolute inset-0 overflow-hidden">
                            <div className="pointer-events-none fixed inset-y-0 right-0 flex max-w-full pl-10">
                                <TransitionChild
                                    enter="transform transition ease-in-out duration-500 sm:duration-700"
                                    enterFrom="translate-x-full"
                                    enterTo="translate-x-0"
                                    leave="transform transition ease-in-out duration-500 sm:duration-700"
                                    leaveFrom="translate-x-0"
                                    leaveTo="translate-x-full"
                                >
                                    <DialogPanel className="pointer-events-auto relative w-screen max-w-md">
                                        <TransitionChild
                                            enter="ease-in-out duration-500"
                                            enterFrom="opacity-0"
                                            enterTo="opacity-100"
                                            leave="ease-in-out duration-500"
                                            leaveFrom="opacity-100"
                                            leaveTo="opacity-0"
                                        >
                                            <div className="absolute left-0 top-0 -ml-8 flex pr-2 pt-4 sm:-ml-10 sm:pr-4">
                                                <button
                                                    type="button"
                                                    className="relative rounded-md text-gray-300 hover:text-white focus:outline-none focus:ring-2 focus:ring-white"
                                                    onClick={() => setOpen(false)}
                                                >
                                                    <span className="absolute -inset-2.5" />
                                                    <X size={32} weight="light" />
                                                </button>
                                            </div>
                                        </TransitionChild>
                                        
                                        <ListaPedido page="Pedidos"/>
                                    </DialogPanel>
                                </TransitionChild>
                            </div>
                        </div>
                    </div>
                </Dialog>
            </Transition>
        </>
    )
}

export default MeusPedidosButton;