import { Dialog, DialogPanel, DialogTitle, Transition, TransitionChild } from "@headlessui/react";
import { X } from "@phosphor-icons/react";
import { Note } from "@phosphor-icons/react";
import { useEffect, useState } from "react";
import CardPedido from "../../pedido/card/CardPedido";
import Item from "../../../models/Item";
import usePedido from "../../../hooks/usePedido";

function MeusPedidosButton() {

    const { totalPedido } = usePedido();

    const [itens, setItens] = useState<Array<Item>>([]);
    const [open, setOpen] = useState<boolean>(false);
    const [isLoading, setIsLoading] = useState(false);
    const [subTotal, setSubTotal] = useState<number>(0);

    async function getSubTotal() {
        const valor = await totalPedido();
        setSubTotal(valor);
    }

    function getItens() {
        setIsLoading(true);

        const pedido = JSON.parse(localStorage.getItem("pedido") || "[]");

        setItens(pedido);
        setIsLoading(false);
    }

    function renderItens() {
        return itens.map((item: Item) => (
            <li key={item.produto.id}>
                <CardPedido item={item} />
            </li>
        ));
    }

    useEffect(() => {
        getSubTotal();
        getItens();
    }, [open]);

    return (
        <>
            <div className="meusPedidos" onClick={() => setOpen(!open)}>
                <Note size={32} color="white" />
                <p>Meus pedidos</p>
            </div>

            <Transition appear show={open}>
                <Dialog className="relative z-10" onClose={setOpen}>
                    <TransitionChild
                        enter="ease-out duration-300"
                        enterFrom="opacity-0 transform-[scale(95%)]"
                        enterTo="opacity-100 transform-[scale(100%)]"
                        leave="ease-in duration-200"
                        leaveFrom="opacity-100 transform-[scale(100%)]"
                        leaveTo="opacity-0 transform-[scale(95%)]"
                    >
                        <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
                    </TransitionChild>

                    <div className="fixed inset-0 overflow-hidden">
                        <div className="absolute inset-0 overflow-hidden">
                            <div className="pointer-events-none fixed inset-y-0 right-0 flex max-w-full pl-10">
                                <TransitionChild
                                    enter="transform transition ease-in-out duration-500 sm:duration-700"
                                    enterFrom="translate-x-full"
                                    enterTo="translate-x-0"
                                    leave="transform transition ease-in-out duration-500 sm:duration-700"
                                    leaveFrom="translate-x-0"
                                    leaveTo="translate-x-full"
                                >
                                    <DialogPanel className="pointer-events-auto relative w-screen max-w-md">
                                        <TransitionChild
                                            enter="ease-in-out duration-500"
                                            enterFrom="opacity-0"
                                            enterTo="opacity-100"
                                            leave="ease-in-out duration-500"
                                            leaveFrom="opacity-100"
                                            leaveTo="opacity-0"
                                        >
                                            <div className="absolute left-0 top-0 -ml-8 flex pr-2 pt-4 sm:-ml-10 sm:pr-4">
                                                <button
                                                    type="button"
                                                    className="relative rounded-md text-gray-300 hover:text-white focus:outline-none focus:ring-2 focus:ring-white"
                                                    onClick={() => setOpen(false)}
                                                >
                                                    <span className="absolute -inset-2.5" />
                                                    <X size={32} weight="light" />
                                                </button>
                                            </div>
                                        </TransitionChild>
                                        <div className="flex h-full flex-col overflow-y-scroll bg-white py-6 shadow-xl">
                                            <div className="px-4 sm:px-6">
                                                <DialogTitle className="text-base font-semibold leading-6 text-gray-900">Meus pedidos</DialogTitle>
                                            </div>
                                            <ul role="list" className="relative mt-6 flex-1 px-4 sm:px-6">
                                                { isLoading ? <></> : renderItens()}
                                            </ul>

                                            <div className="border-t border-gray-200 px-4 py-6 sm:px-6">
                                                <div className="flex justify-between text-base font-medium text-gray-900">
                                                    <p>Subtotal</p>
                                                    <p>R$ { isLoading ? 0 : subTotal }</p>
                                                </div>
                                                <p className="mt-0.5 text-sm text-gray-500">Impostos calculados na finalização da compra.</p>
                                                <div className="mt-6">
                                                    <a
                                                        href="#"
                                                        className="flex items-center justify-center rounded-md border border-transparent bg-indigo-600 px-6 py-3 text-base font-medium text-white shadow-sm hover:bg-indigo-700"
                                                    >
                                                        Enviar pedidos
                                                    </a>
                                                </div>
                                            </div>
                                        </div>
                                    </DialogPanel>
                                </TransitionChild>
                            </div>
                        </div>
                    </div>
                </Dialog>
            </Transition>
        </>
    )
}

export default MeusPedidosButton;