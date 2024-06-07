import { useContext, useEffect, useState } from "react";
import { LoginContext } from "../../../contexts/LoginContext";
import CardPedido from "../card/CardPedido";
import Pedido from "../../../models/Pedido";
import { Button, Dialog, DialogPanel, Transition, TransitionChild } from "@headlessui/react";
import { X } from "@phosphor-icons/react";
import ListaItemPedido from "../itemPedido/lista/ListaItemPedido";
import Item from "../../../models/Item";

function ListaPedido(props: { pedidos: Array<Pedido> }) {
    const { usuario } = useContext(LoginContext);

    const [pedidos, setPedidos] = useState<Array<Pedido>>([
        {
            id: 1,
            mesa: {
                id: 1,
                numero: 4,
                restaurante: {
                    id: "1",
                    nome: "Bar do Zé",
                },
                chamarGarcom: true,
            },
            item: [
                {
                    "produto": {
                        "id": 1,
                        "nome": "Prato especial",
                        "descricao": "Especial da casa! Acompanha... Especial da casa! Acompanha...",
                        "foto": "https://http2.mlstatic.com/D_NQ_NP_984716-MLU74556662341_022024-O.webp",
                        "valor": 25.99, "disponivel": true
                    },
                    "quantidade": 2
                },
                {
                    "produto": {
                        "id": 2,
                        "nome": "Prato", "descricao": "Especial da casa! Acompanha... Especial da casa! Acompanha...", "foto": "https://http2.mlstatic.com/D_NQ_NP_984716-MLU74556662341_022024-O.webp", "valor": 25.99, "disponivel": true
                    },
                    "quantidade": 3,
                    "observacao": "Sem farofa sem farofa sem farofa sem farofa"
                },
            ],
            data: "11/02/2024",
            status: "REALIZADO",
        },
        {
            id: 2,
            mesa: {
                id: 2,
                numero: 4,
                restaurante: {
                    id: "1",
                    nome: "Bar do Zé",
                },
                chamarGarcom: true,
            },
            item: [
                {
                    "produto": {
                        "id": 1,
                        "nome": "Prato especial",
                        "descricao": "Especial da casa! Acompanha... Especial da casa! Acompanha...",
                        "foto": "https://http2.mlstatic.com/D_NQ_NP_984716-MLU74556662341_022024-O.webp",
                        "valor": 25.99, "disponivel": true
                    },
                    "quantidade": 2
                },
                {
                    "produto": {
                        "id": 2,
                        "nome": "Prato", "descricao": "Especial da casa! Acompanha... Especial da casa! Acompanha...", "foto": "https://http2.mlstatic.com/D_NQ_NP_984716-MLU74556662341_022024-O.webp", "valor": 25.99, "disponivel": true
                    },
                    "quantidade": 3,
                    "observacao": "Sem farofa sem farofa sem farofa sem farofa"
                },
            ],
            data: "11/02/2024",
            status: "REALIZADO",
        },
    ]);

    const [currentPedidoId, setCurrentPedidoId] = useState<number>(0);
    const [currentItems, setCurrentItems] = useState<Array<Item>>([])

    const [total, setTotal] = useState<number>(0);
    const [quantidade, setQuantidade] = useState<number>(0);

    const [isOpen, setIsOpen] = useState<boolean>(false);
    const [isLoading, setIsLoading] = useState<boolean>(false);

    function renderModal(pedido: Pedido) {
        setIsOpen(true);
        setCurrentPedidoId(pedido.id || 0);
        setCurrentItems(pedido.item);
    }

    function totalPedidos() {
        let subTotal: number = 0;
        let subQuantidade: number = 0;

        pedidos.map((pedido) => {
            subQuantidade++;

            subTotal += pedido.item.reduce((acumulador, item) => (
                acumulador + (item.produto.valor * item.quantidade)
            ), 0);
        });

        setQuantidade(subQuantidade);
        setTotal(subTotal);
    }

    function renderItens() {
        if (usuario.perfil === "COZINHA" ) {
            return (
                <ul className="flex w-full h-full m-4">
                    { pedidos.map((pedido: Pedido) => (
                        <li key={pedido.id} onClick={() => renderModal(pedido)} className="button text-sm text-nowrap w-32 h-20 flex flex-col justify-center items-center lg:w-24 2xl:w-32" >
                            <p>Mesa</p>
                            { pedido.mesa.id }
                        </li> 
                    ))}
                </ul>
            )
        } else {
            return pedidos.map((pedido: Pedido) => (
                <tr key={pedido.id} className="flex">
                    <CardPedido pedido={pedido} />
    
                    <td className="flex justify-center w-full">
                        <Button onClick={() => renderModal(pedido)} className="button text-sm text-nowrap w-32 h-8 flex justify-center items-center lg:w-24 2xl:w-32">
                            Ver itens
                        </Button>
                    </td>
                </tr>
            ));
        }
    }

    useEffect(() => {
        setIsLoading(true);
        renderItens();
        totalPedidos();
        setIsLoading(false);
    }, [])

    // Criar busca de pedidos no banco por perfis de usuario + useEffect + condicional no return 

    // Cozinha: get pedidos "REALIZADOS"
    // Garçom: get pedidos "PRONTOS"
    // Caixa: get all pedidos do dia
    // Gerente/superior: get all pedidos

    // Apenas Cozinha terá visualização dos pedidos por botões

    return (

        <>
            {usuario.perfil === "COZINHA" 
                ? <>
                    {isLoading ? <></> : renderItens()}
                </>
                
                : <div className="flex flex-col mt-10 mx-auto w-3/5 max-w-[65%] max-h-[75%] h-full relative overflow-hidden shadow-md rounded-lg">
                    <table className="table-auto flex flex-col w-full h-full text-left rtl:text-right">
                        <thead className="h-10 text-xs text-gray-200 uppercase bg-gray-700 ">
                            <tr className="flex justify-between w-full h-full">
                                <th scope="col" className="w-full h-full flex justify-center items-center p-0 lg:font-semibold">
                                    Código Pedido
                                </th>
                                <th scope="col" className="w-full h-full flex justify-center items-center p-0 lg:font-semibold">
                                    Mesa
                                </th>
                                <th scope="col" className="w-full h-full flex justify-center items-center p-0 lg:font-semibold">
                                    { usuario.perfil === "GARCOM" ? "Hora" : "Data" }
                                </th>
                                {/* <th scope="col" className="w-full h-full flex justify-center items-center p-0 lg:font-semibold">
                                    Hora
                                </th> */}
                                { usuario.perfil === "GARCOM" ? <></> :
                                    <th scope="col" className="w-full h-full flex justify-center items-center p-0 lg:font-semibold">
                                        Status
                                    </th>
                                }
                                <th scope="col" className="w-full h-full flex justify-center items-center p-0 lg:font-semibold">
                                    Ação
                                </th>
                            </tr>
                        </thead>
                        <tbody className="flex flex-col gap-6 overflow-auto w-full max-h-content h-[85%] mt-4 text-gray-700 text-sm">
                            {isLoading ? <></> : renderItens()}
                        </tbody>
                        {(usuario.perfil === "CAIXA" || usuario.perfil === "GERENTE" || usuario.perfil === "ADMIN") &&
                            <tfoot className="flex flex-1 items-center w-full max-h-[25%] h-12 pb-4">
                                <tr className="flex items-center justify-end px-6 w-full h-full font-semibold text-gray-900">
                                    <th scope="row" className="flex justify-center items-center text-base w-full">
                                        Total
                                    </th>
                                    <td className="flex justify-center items-center text-center w-full">
                                        Qtd {quantidade}
                                    </td>
                                    <td className="flex justify-center items-center text-center w-full">
                                        R$ {total.toFixed(2)}
                                    </td>
                                    <td className="flex w-full"></td>
                                    <td className="flex w-full"></td>
                                </tr>
                            </tfoot>
                        }
                    </table>
                </div>
            }

            <Transition appear show={isOpen} >
                <Dialog as="div" className="absolute inset-0 z-10 w-screen focus:outline-none" onClose={() => setIsOpen(false)}>

                    <div className="flex min-h-full w-full items-center justify-center">
                        <TransitionChild
                            enter="ease-out duration-200"
                            enterFrom="opacity-0 transform-[scale(95%)]"
                            enterTo="opacity-100 transform-[scale(100%)]"
                            leave="ease-in duration-200"
                            leaveFrom="opacity-100 transform-[scale(100%)]"
                            leaveTo="opacity-0 transform-[scale(95%)]"
                        >
                            <DialogPanel className="rounded-xl h-3/4 w-3/4 max-w-3xl px-2 py-2">

                                <div className="container h-full w-full flex justify-center items-center">
                                    <div className="flex flex-col w-full h-[30rem] rounded-xl bg-slate-500 px-6 pb-6 max-[460px]:p-4">
                                        <div className="flex justify-end my-2">
                                            <X size={32} color="white" onClick={() => setIsOpen(false)} />
                                        </div>
                                        <div className="div rounded-xl bg-white/5 overflow-hidden backdrop-blur-2xl w-full flex-1 flex-col justify-center">
                                            <ListaItemPedido item={currentItems} pedidoId={currentPedidoId} />
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

export default ListaPedido;