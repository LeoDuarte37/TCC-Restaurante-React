import { Dialog, DialogPanel, Transition, TransitionChild } from "@headlessui/react"
import { useContext, useState } from "react";
import Produto from "../../../../models/produto/Produto";
import { LoginContext } from "../../../../contexts/LoginContext";
import { deletar } from "../../../../services/Service";
import toastAlert from "../../../../utils/toastAlert";

export default function ModalDeleteProduto(props: { produto: Produto; setOpen: Function}) {

    const { login } = useContext(LoginContext);

    const [isOpen, setIsOpen] = useState<boolean>(false);

    async function excluir() {
        try {
            await deletar(`/produto/${props.produto.id}`, {
                headers: {
                    Authorization: login.token,
                },
            });

            toastAlert("Produto deletado!", "sucesso");
            setIsOpen(false);
            props.setOpen(false);
        } catch (error: any) {
            toastAlert("Erro ao deletar produto. Por favor, tente novamente.", "erro");
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
                            <DialogPanel className="flex justify-center rounded-xl h-full w-full max-[440px]:max-w-full max-w-[60%] p-10 max-[440px]:p-2">

                                <div className="containerExcluir rounded-xl h-full w-full flex justify-center items-center border-2 border-[#FFFFFF]">
                                    <div className="flex flex-col justify-center items-center pb-2 h-[30rem] rounded-xl max-[440px]:p-2">
                                        <div className="flex justify-between my-2">
                                            <h1 className="text-[#F8F8F8] text-center w-full subCategoriaTitle text-4xl font-bold">
                                                Excluir Produto?
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