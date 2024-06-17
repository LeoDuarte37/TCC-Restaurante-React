import { Transition, Dialog, TransitionChild, DialogPanel } from "@headlessui/react";
import { X } from "@phosphor-icons/react";
import { useState } from "react";
import Subcategoria from "../../../../models/subcategoria/Subcategoria";
import FormEditSubcategoria from "../forms/FormEditSubcategoria";
import ModalDeleteSubcategoria from "./ModalDeleteSubcategoria";


export default function ModalEditSubcategoria(props: { subcategoria: Subcategoria}) {

    const [isOpen, setIsOpen] = useState<boolean>(false);

    return (
        <>
            <button onClick={() => setIsOpen(true)} className="bg-[#D42300] hover:bg-[#b51f02] mb-3 text-white font-semibold py-1 px-2 rounded h-8">
                Editar Subcategoria
            </button>

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
                            <DialogPanel className="flex justify-center rounded-xl h-full w-full max-[440px]:max-w-full max-w-2xl p-10 max-[440px]:p-2 overflow-hidden">
                                <div className="flex h-full w-full">
                                    <div className="flex justify-center items-center h-full w-full max-h-[20rem] modalItemPedido rounded-xl max-[440px]:p-2">
                                        <div className="flex justify-between my-2 w-full">
                                            <div className="w-[18%]">
                                                <ModalDeleteSubcategoria subcategoria={props.subcategoria} setOpen={setIsOpen}/>
                                            </div>

                                            <h1 className="text-[#D42300] text-center w-full subCategoriaTitle text-2xl font-bold">
                                                Editar Subcategoria
                                            </h1>
                                            
                                            <div className="w-[25%] flex justify-end">
                                                <X size={32} color="#3B1206" onClick={() => setIsOpen(false)} />
                                            </div>
                                        </div>
                                        <div className="rounded-xl bg-white/5 border-2 border-[#F5EBDC] overflow-hidden backdrop-blur-2xl w-full flex-1 flex-col justify-center">
                                            <FormEditSubcategoria subcategoria={props.subcategoria} setOpen={setIsOpen} />
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