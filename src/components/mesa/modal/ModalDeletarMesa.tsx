import { useContext, useState } from "react";
import { deletar } from "../../../services/Service";
import { useNavigate } from "react-router-dom";
import { LoginContext } from "../../../contexts/LoginContext";
import toastAlert from "../../../utils/toastAlert";
import { Transition, Dialog, TransitionChild, DialogPanel } from "@headlessui/react";

export default function ModalDeletarMesa(props: { mesaId: number, setOpen: Function }) {

    const { login, handleLogout } = useContext(LoginContext);

    const navigate = useNavigate();

    const [isOpen, setIsOpen] = useState<boolean>(false);

    async function excluir() {
        try {
            await deletar(`/mesa/${props.mesaId}`, {
                headers: {
                    Authorization: `Bearer ${login.token}`,
                },
            });

            toastAlert("Mesa deletada!", "sucesso");
            setIsOpen(false);
            props.setOpen(false);

        } catch (error: any) {
            if (error.toString().includes('403')) {
                toastAlert("Por favor, faça login novamente!", "info");
                handleLogout();
                navigate('/');
            } else {
                toastAlert("Erro ao deletar mesa. Por favor, tente novamente.", "erro");
            }
        }
    }

    return (
        <>
            <button className="buttonExcluir" onClick={() => setIsOpen(true)}>
                Excluir?
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
                            <DialogPanel className="flex justify-center rounded-xl h-full w-full max-[440px]:max-w-full max-w-[70%] p-10 max-[440px]:p-2">

                                <div className="containerExcluir h-full w-full flex justify-center items-center rounded-xl border-2 border-[#FFFFFF]">
                                    <div className="flex flex-col justify-center items-center pb-2 h-[33rem] rounded-xl max-[440px]:p-2">
                                        <div className="flex justify-between my-2">
                                            <h1 className="text-[#F8F8F8] text-center w-full subCategoriaTitle text-4xl font-bold">
                                                Excluir Mesa?
                                            </h1>
                                        </div>
                                        <div className="w-full p-4 flex justify-center rounded-xl overflow-hidden">
                                            <button onClick={() => setIsOpen(false)} className="buttonExcluir h-16 w-full text-center text-xl flex items-center justify-center self-center mt-3">
                                                Não
                                            </button>
                                            <button onClick={excluir} className="buttonExcluir h-16 w-full text-center flex items-center justify-center self-center mt-3">
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