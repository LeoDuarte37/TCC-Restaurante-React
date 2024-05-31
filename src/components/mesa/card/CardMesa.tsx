import { Button, Transition, Dialog, TransitionChild, DialogPanel } from "@headlessui/react";
import { ArrowArcRight } from "@phosphor-icons/react";
import Mesa from "../../../models/Mesa";
import { useState } from "react";

function CardMesa(props: {mesa?: Mesa}) {

    const [isOpen, setIsOpen] = useState<boolean>(false);

    return (
        <>
                <Button
                    onClick={() => setIsOpen(true)}
                    className="cardMesa"
                >
                    Mesa 01
                </Button>

            

                <Transition appear show={isOpen}>
                    <Dialog as="div" className="relative z-10 focus:outline-none" onClose={() => setIsOpen(false)}>
                        <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
                            <div className="flex min-h-full items-center justify-center p-4">
                                <TransitionChild
                                    enter="ease-out duration-300"
                                    enterFrom="opacity-0 transform-[scale(95%)]"
                                    enterTo="opacity-100 transform-[scale(100%)]"
                                    leave="ease-in duration-200"
                                    leaveFrom="opacity-100 transform-[scale(100%)]"
                                    leaveTo="opacity-0 transform-[scale(95%)]"
                                >
                                    <DialogPanel className="rounded-xl bg-white/5 px-6 pb-6 pt-0 backdrop-blur-2xl">
                                        <div className="flex justify-end my-2">
                                            <ArrowArcRight size={32} color="white" onClick={() => setIsOpen(false)} />
                                        </div>
                                        
                                        {/* LISTA PEDIDOS, PASSANDO PAGE="Cozinha" */}

                                    </DialogPanel>
                                </TransitionChild>
                            </div>
                        </div>
                    </Dialog>
                </Transition>
        </>
    )
}

export default CardMesa;