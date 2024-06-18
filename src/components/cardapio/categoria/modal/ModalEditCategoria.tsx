import { Transition, Dialog, TransitionChild, DialogPanel } from "@headlessui/react";
import { Pencil, X } from "@phosphor-icons/react";
import FormEditCategoria from "../forms/FormEditCategoria";
import { useState } from "react";
import Categoria from "../../../../models/categoria/Categoria";
import ModalDeleteCategoria from "./ModalDeleteCategoria";

export default function ModalEditCategoria(props: { categoria: Categoria }) {

    const [isOpen, setIsOpen] = useState<boolean>(false);

    return (
        <>
            <Pencil size={35}
                color="#D42300"
                className="self-center hover:text-[#b51f02]"
                onClick={() => setIsOpen(true)} />

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
                                        <div className="flex justify-between my-2 w-full">
                                            <div className="w-[18%]">
                                                <ModalDeleteCategoria categoria={props.categoria} setOpen={setIsOpen} />
                                            </div>

                                            <h1 className="text-[#D42300] text-center w-full subCategoriaTitle text-2xl font-bold">
                                                Editar Categoria
                                            </h1>

                                            <div className="w-[25%] flex justify-end">
                                                <X size={32} color="#3B1206" onClick={() => setIsOpen(false)} />
                                            </div>
                                        </div>
                                        <div className="w-full max-w-full flex-1 flex-col justify-center rounded-xl bg-white/5 border-2 border-[#F5EBDC] overflow-hidden backdrop-blur-2xl">
                                            <FormEditCategoria categoriaModal={props.categoria} />
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