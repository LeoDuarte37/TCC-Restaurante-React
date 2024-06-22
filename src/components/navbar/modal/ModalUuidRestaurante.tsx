import { Dialog, DialogPanel, Transition, TransitionChild } from "@headlessui/react";
import { ChefHat, X } from "@phosphor-icons/react";
import { useState, useContext } from "react";
import { LoginContext } from "../../../contexts/LoginContext";

export default function ModalUuidRestaurante() {

    const { login } = useContext(LoginContext);

    const [isOpen, setIsOpen] = useState<boolean>(false);

    return (
        <>
            <div onClick={() => setIsOpen(true)} className="logo cursor-pointer">
                <ChefHat size={50} color='#f8f8f8' />
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
                                    <div className="flex justify-center items-center max-h-[10rem] modalItemPedido rounded-xl max-[440px]:p-2">
                                        <div className="flex w-full h-8 my-2">
                                            <h1 className="text-[#D42300] ml-6 text-center w-full subCategoriaTitle text-2xl font-bold">
                                                ID Restaurante
                                            </h1>
                                            <X size={32} color="#3B1206" className="" onClick={() => setIsOpen(false)} />
                                        </div>
                                        <div className="w-full max-w-full flex-1 flex-col justify-center rounded-xl bg-white/5 border-2 border-[#F5EBDC] overflow-hidden backdrop-blur-2xl">
                                            <div className="flex flex-col p-4">
                                                <input
                                                    type="text"
                                                    name="uuid"
                                                    defaultValue={login?.restauranteUuid}
                                                    className='mt-2 block w-full rounded-lg border-2 border-[#D42300] bg-[#f8f8f8] py-1.5 px-3 text-sm/6 text-gray focus:outline-none focus:outline-1 focus:ring-[#D42300] focus:-outline-offset-0 focus:outline-' />
                                            </div>
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