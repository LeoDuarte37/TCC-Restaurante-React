import { Transition, Dialog, TransitionChild, DialogPanel } from "@headlessui/react";
import { X } from "@phosphor-icons/react";
import Pedido from "../../../models/pedido/Pedido";
import ListaPedido from "../../pedido/lista/ListaPedido";

export default function ModalPedidoMesa(props: { pedidos: Array<Pedido>, isOpen: boolean, setIsOpen: Function }) {

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
                                <div className="modalItemMesa rounded-xl max-[440px]:p-2">
                                    <div className="flex justify-between w-full my-4">
                                        <h1 className="text-[#D42300] ml-6 uppercase whitespace-pre text-center w-full subCategoriaTitle text-2xl font-bold">
                                            Pedidos  -  Mesa {props?.pedidos[0]?.mesa.numero }
                                        </h1>
                                        <X size={32} color="#3B1206" onClick={() => props.setIsOpen(false)} />
                                    </div>

                                    <div className="w-full h-full mb-4 flex flex-col justify-center items-center rounded-xl bg-white/5 overflow-hidden backdrop-blur-2xl">
                                        <ListaPedido pedidos={props.pedidos} />
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