import { Transition, Dialog, TransitionChild, DialogPanel } from "@headlessui/react";
import { X } from "@phosphor-icons/react";
import { useState } from "react";
import FormCategoria from "../categoria/forms/FormCategoria";
import React from "react";

function ModalCrudCardapio(props: { form: string }) {

    const [isOpen, setIsOpen] = useState<boolean>(false);

    let element: React.JSX.Element;

    switch (props.form) {
        case "NovaCategoria":
            element = <FormCategoria />
            break;

        case "EditCategoria":

            break;

        case "EditSubcategoria":

            break;
        
        case "EditProduto":
            
            break;

        default: break;
    }
    
    return (
        <Transition appear show={isOpen} >
            <Dialog as="div" className="absolute inset-0 z-10 w-screen focus:outline-none"
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
                        <DialogPanel className="flex justify-center rounded-xl h-3/4 w-full max-[440px]:max-w-full max-w-3xl p-10 max-[440px]:p-2">

                            <div className="container h-full w-full flex justify-center items-center">
                                <div className="modalItemPedido rounded-xl max-[440px]:p-2">
                                    <div className="flex justify-between my-2">
                                        <div className="identificacao">
                                            <p className="text-[#3B1206]">Mesa </p>
                                        </div>
                                        <X size={32} color="#3B1206" onClick={() => setIsOpen(false)} />
                                    </div>
                                    <div className="div rounded-xl bg-white/5 border-2 border-[#F5EBDC] overflow-hidden backdrop-blur-2xl w-full flex-1 flex-col justify-center">
                                        { }
                                    </div>
                                </div>
                            </div>
                        </DialogPanel>
                    </TransitionChild>
                </div>
            </Dialog>
        </Transition>
    )
}

export default ModalCrudCardapio;