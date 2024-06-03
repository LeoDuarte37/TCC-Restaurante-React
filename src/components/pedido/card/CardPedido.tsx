import { Button, Transition, Dialog, TransitionChild, DialogPanel } from "@headlessui/react";
import { ArrowArcRight } from "@phosphor-icons/react";
import { useState } from "react";
import Pedido from "../../../models/Pedido";

function CardPedido(props: { pedido: Pedido }) {
    
    const [isOpen, setIsOpen] = useState<boolean>(false);

    return (
        <>
            <Button onClick={() => setIsOpen(true)} className="button w-32 h-16">
                {props.pedido?.mesa.id}
            </Button>

            <Transition appear show={isOpen}>
                <Dialog as="div" className="relative z-10 focus:outline-none" onClose={() => setIsOpen(false)}>
                    <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
                        <div className="flex min-h-full w-full items-center justify-center">
                            <TransitionChild
                                enter="ease-out duration-300"
                                enterFrom="opacity-0 transform-[scale(95%)]"
                                enterTo="opacity-100 transform-[scale(100%)]"
                                leave="ease-in duration-200"
                                leaveFrom="opacity-100 transform-[scale(100%)]"
                                leaveTo="opacity-0 transform-[scale(95%)]"
                            >
                                <DialogPanel className="rounded-xl h-full w-3/4 max-w-3xl px-6 pb-6 pt-0">

                                    <div className="container h-full w-full flex justify-center items-center">
                                        <div className="flex flex-col w-full h-96 rounded-xl bg-white/5 px-6 pb-6 max-[460px]:p-4 backdrop-blur-2xl">
                                            <div className="flex justify-end my-2">
                                                <ArrowArcRight size={32} color="white" onClick={() => setIsOpen(false)} />
                                            </div>
                                            <div className="div w-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
                                                <h1>Ola</h1>
                                                {/* LISTA PEDIDOS, PASSANDO PAGE="Cozinha" */}
                                            </div>
                                        </div>
                                    </div>

                                </DialogPanel>
                            </TransitionChild>
                        </div>
                    </div>
                </Dialog>
            </Transition>
        </>          
    );
}

export default CardPedido;