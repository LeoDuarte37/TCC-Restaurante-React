import { useContext, useState } from "react";
import { MesaContext } from "../../../contexts/MesaContext";
import { atualizarStatusMesa } from "../../../services/Service";
import { Transition, Dialog, TransitionChild, DialogPanel } from "@headlessui/react";
import toastAlert from "../../../utils/toastAlert";
import { useNavigate } from "react-router-dom";
import usePedido from "../../../hooks/usePedido";
import Status from "../../../models/Status";

export default function ModalFecharConta() {

    const { mesa, atualizarMesa } = useContext(MesaContext);

    const navigate = useNavigate();
    const { clearPedido } = usePedido();

    const [isOpen, setIsOpen] = useState<boolean>(false);

    async function fechar() {
        try {
            const statusMesa: Status = { id: mesa.id, status: "P" };

            await atualizarStatusMesa(statusMesa, atualizarMesa);

            clearPedido();
            navigate("/mesa/conta/fechada");
        } catch (error: any) {
            console.log(error)
            toastAlert("Erro ao fechar conta! Por favor, tente novamente...", "erro");
        }
    }

    return (
        <>
            <button onClick={() => setIsOpen(true)} className="button">Fechar conta</button>

            <Transition appear show={isOpen} >
                <Dialog as="div" className="absolute top-28 left-12 z-10 p-10 w-screen focus:outline-none"
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
                            <DialogPanel className="flex justify-center rounded-xl h-full w-full max-[440px]:max-w-full max-w-lg p-10 max-[440px]:p-2">

                                <div className="containerExcluir rounded-xl h-full w-full flex justify-center items-center border-2 border-[#FFF]">
                                    <div className="flex flex-col justify-center items-center pb-2 h-[16rem] max-h-[20rem] rounded-xl max-[440px]:p-2">
                                        <div className="flex justify-center items-center my-2">
                                            <h1 className="text-[#F8F8F8] text-center w-full subCategoriaTitle text-4xl font-bold">
                                                Fechar a conta?
                                            </h1>
                                        </div>
                                        <div className="w-full p-4 flex justify-center rounded-xl overflow-hidden">
                                            <button onClick={() => setIsOpen(false)} className="buttonExcluir h-16 w-full text-center text-xl flex items-center justify-center self-center mt-3">
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
        </>
    )
}