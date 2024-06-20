import { Transition, Dialog, TransitionChild, DialogPanel } from "@headlessui/react";
import { useNavigate } from "react-router-dom";

export default function ModalFecharContaCaixa(props: { isOpen: boolean, setIsOpen: Function }) {

    const navigate = useNavigate();

    async function fechar() {

    }

    return (
        <Transition appear show={props.isOpen} >
            <Dialog as="div" className="absolute inset-0 z-10 p-10 w-screen focus:outline-none"
                onClose={() => props.setIsOpen(false)}>

                <div className="flex min-h-full w-full items-center justify-center">
                    <TransitionChild
                        enter="ease-out duration-200"
                        enterFrom="opacity-0 transform-[scale(95%)]"
                        enterTo="opacity-100 transform-[scale(100%)]"
                        leave="ease-in duration-200"
                        leaveFrom="opacity-100 transform-[scale(100%)]"
                        leaveTo="opacity-0 transform-[scale(95%)]"
                    >
                        <DialogPanel className="flex justify-center rounded-xl h-full w-full max-[440px]:max-w-full max-w-[70%] p-10 max-[440px]:p-2">

                            <div className="container h-full w-full flex justify-center items-center rounded-xl">
                                <div className="modalFecharMesaCaixa flex w-full justify-center items-center bg-[#3B1206] rounded-xl max-[440px]:p-2">
                                    <div className="flex justify-center items-center my-2">
                                        <h1 className="text-[#F8F8F8] text-center w-full subCategoriaTitle text-4xl font-bold">
                                            Fechar a conta?
                                        </h1>
                                    </div>
                                    <div className="w-full p-4 flex justify-center rounded-xl overflow-hidden">
                                        <button onClick={() => props.setIsOpen(false)} className="buttonExcluir h-16 w-full text-center text-xl flex items-center justify-center self-center mt-3">
                                            Não
                                        </button>
                                        <button onClick={fechar} className="buttonExcluir h-16 w-full text-center flex items-center justify-center self-center mt-3">
                                            Sim
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </DialogPanel>
                    </TransitionChild>
                </div>
            </Dialog>
        </Transition>
    );
}
