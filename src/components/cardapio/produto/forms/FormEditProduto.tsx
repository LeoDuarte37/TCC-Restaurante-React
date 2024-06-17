import { ChangeEvent, useState } from "react";
import Produto from "../../../../models/produto/Produto";
import { Transition, Dialog, TransitionChild, DialogPanel } from "@headlessui/react";
import { X } from "@phosphor-icons/react";

function FormEditProduto(props: { produto: Produto }) {
    const [produto, setProduto] = useState<Produto>(props.produto);

    const [isOpen, setIsOpen] = useState<boolean>(false);

    function atualizarEstado(e: ChangeEvent<HTMLInputElement>) {
        const target = e.target;
        const value = target.type === 'checkbox' ? target.checked : target.value;
        const name = target.name;

        setProduto({
            ...produto,
            [name]: value,
        });
    }

    function atualizarDescricao(e: ChangeEvent<HTMLTextAreaElement>) {
        setProduto({
            ...produto,
            [e.target.name]: e.target.value,
        });
    }

    async function submit(e: ChangeEvent<HTMLFormElement>) {
        e.preventDefault();
    }

    return (
        <>
            <form onSubmit={submit} className="h-full p-4 flex flex-col text-[#3B1206] text-lg font-bold">
                <div className="flex flex-col gap-3">
                    <fieldset className="flex gap-3 h-full">
                        <div className="w-full">
                            <label htmlFor="nome">
                                Nome do produto:
                            </label>
                            <input value={produto.nome}
                                type="text"
                                name="nome"
                                onChange={(e: ChangeEvent<HTMLInputElement>) => atualizarEstado(e)}
                                className='block h-full max-h-10 w-full rounded-lg border-2 border-[#D42300] bg-[#f8f8f8] py-1.5 px-3 text-sm/6 text-gray focus:outline-none focus:outline-1 focus:ring-[#D42300] focus:-outline-offset-0 focus:outline-' />
                        </div>
                        <div className="w-full">
                            <label htmlFor="valor">Valor:</label>
                            <input value={produto.valor}
                                type="number"
                                name="valor"
                                onChange={(e: ChangeEvent<HTMLInputElement>) => atualizarEstado(e)}
                                className="block h-full max-h-10 w-full rounded-lg border-2  border-[#D42300] checked:outline-[#D42300] focus:outline-[#D42300] checked:bg-[#D42300]" />
                        </div>
                    </fieldset>
                    <fieldset>
                        <label htmlFor="descricao">Descrição:</label>
                        <textarea value={produto.descricao}
                            name="descricao"
                            onChange={(e: ChangeEvent<HTMLTextAreaElement>) => atualizarDescricao(e)}
                            className="block w-full h-16 max-h-16 rounded-lg border-2 border-[#D42300]" />
                    </fieldset>
                    <fieldset>
                        <label htmlFor="valor">Foto:</label>
                        <input value={produto.foto}
                            type="text"
                            name="foto"
                            onChange={(e: ChangeEvent<HTMLInputElement>) => atualizarEstado(e)}
                            className="block w-full rounded-lg border-2  border-[#D42300] checked:outline-[#D42300] focus:outline-[#D42300] checked:bg-[#D42300]" />
                    </fieldset>
                    <fieldset>
                        <label htmlFor="disponivel">Disponivel:</label>
                        <input checked={produto.disponivel}
                            type="checkbox"
                            name="disponivel"
                            onChange={(e: ChangeEvent<HTMLInputElement>) => atualizarEstado(e)}
                            className="size-6 ml-2 rounded-lg border-2  border-[#D42300] checked:outline-[#D42300] focus:outline-[#D42300] checked:bg-[#D42300]" />
                    </fieldset>
                </div>

                <div className="h-full w-full flex justify-center">
                    <button onClick={() => setIsOpen(true)} className="button h-12 w-full text-center flex items-center justify-center self-center mt-3">
                        Excluir
                    </button>
                    <button className="button h-12 w-full text-center flex items-center justify-center self-center mt-3">
                        Editar 
                    </button>
                </div>
            </form>

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
                                            <h1 className="text-[#F8F8F8] ml-6 text-center w-full subCategoriaTitle text-4xl font-bold">
                                                Excluir Produto?
                                            </h1>
                                        </div>
                                        <div className="w-full p-4 flex justify-center rounded-xl bg-white/5 overflow-hidden backdrop-blur-2xl ">
                                            <button onClick={() => setIsOpen(false)} className="buttonExcluir h-16 w-full text-center text-xl flex items-center justify-center self-center mt-3">
                                                Não
                                            </button>
                                            <button className="buttonExcluir h-16 w-full text-center flex items-center justify-center self-center mt-3">
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
    );
}

export default FormEditProduto;