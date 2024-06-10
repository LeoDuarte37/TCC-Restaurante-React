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
            data: "11/03/2024 16:48",
            status: "REALIZADO",
        },
        {
            id: 2,
            mesa: {
                id: 2,
                numero: 2,
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
            data: "12/03/2024 10:48",
            status: "REALIZADO",
        },
    ]);

    const [currentPedido, setCurrentPedido] = useState<Pedido>(pedidos[0]);
    const [currentItems, setCurrentItems] = useState<Array<Item>>([])

    const [total, setTotal] = useState<number>(0);
    const [quantidade, setQuantidade] = useState<number>(0);

    const [isOpen, setIsOpen] = useState<boolean>(false);
    const [isLoading, setIsLoading] = useState<boolean>(false);

    function renderModal(pedido: Pedido) {
        setIsOpen(true);
        setCurrentPedido(pedido);
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

    const [ largura, setLargura ] = useState<number>(window.innerWidth);

    addEventListener("resize", () => setLargura(window.innerWidth));

    function renderItens() {
        if (usuario.perfil === "COZINHA" ) {
            return (
                <ul className="flex w-full h-full m-4 p-4 max-[690px]:p-2 border-2 border-[#3B1206] rounded-lg">
                    { pedidos.map((pedido: Pedido) => (
                        <li key={pedido.id} onClick={() => renderModal(pedido)} className="button mx-2 text-base text-nowrap w-full max-w-32 h-20 flex flex-col justify-center items-center max-[460px]:max-w-full" >
                            <p>Mesa</p>
                            { pedido.mesa.numero }
                        </li> 
                    ))}
                </ul>
            )
        } else {
            return pedidos.map((pedido: Pedido) => (
                <tr key={pedido.id} className="flex text-[#3B1206] text-base max-[690px]:text-sm">
                    <CardPedido pedido={pedido} />
    
                    <td className="flex justify-center w-full">
                        <Button onClick={() => renderModal(pedido)} className="button text-base w-32 h-8 m-0 p-0 flex justify-center items-center 2xl:w-32 max-[540px]:w-12 max-[900px]:w-24 max-[540px]:text-[14px]">
                            { largura < 540 ? "Ver" : "Ver itens" }
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
                
                : <div className="flex flex-col w-full max-w-6xl max-[650px]:max-w-full h-full overflow-hidden shadow-md rounded-lg">
                    <table className="table-auto flex flex-col w-full max-h-full h-full bg-[#F8F8F8] text-left rtl:text-right rounded-lg overflow-hidden border-2 border-[#F5EBDC]">
                        <thead className="h-12 font-semibold text-center text-base text-[#F8F8F8] uppercase bg-[#3B1206] max-[690px]:text-sm">
                            <tr className="flex justify-between w-full h-full ">
                                <th scope="col" className="w-full h-full flex justify-center items-center p-0">
                                    <p className="text-center max-[800px]:w-14">
                                        { largura > 800 ? "Cód. Pedido" : "Pedido" }
                                    </p>
                                </th>
                                <th scope="col" className="w-full h-full flex justify-center items-center p-0 ">
                                    <p>
                                        Mesa
                                    </p>
                                </th>
                                <th scope="col" className="w-full h-full flex justify-center items-center p-0">
                                    <p>
                                        { usuario.perfil === "GARCOM" ? "Hora" : "Data" }
                                    </p>
                                </th>
                                { usuario.perfil === "GARCOM" ? <></> :
                                    <>
                                        <th scope="col" className="w-full h-full flex justify-center items-center p-0">
                                            <p>
                                                Hora
                                            </p>
                                        </th>
                                        <th scope="col" className="w-full h-full flex justify-center items-center p-0">
                                            <p>
                                                Status
                                            </p>
                                        </th>
                                    </>
                                }
                                <th scope="col" className="w-full h-full flex justify-center items-center p-0">
                                    <p>
                                        Ação
                                    </p>
                                </th>
                            </tr>
                        </thead>
                        <tbody className="flex flex-col gap-6 overflow-auto w-full max-h-content h-[85%] mt-4">
                            {isLoading ? <></> : renderItens()}
                        </tbody>
                        {(usuario.perfil === "CAIXA" || usuario.perfil === "GERENTE" || usuario.perfil === "ADMIN") &&
                            <tfoot className="flex flex-1 items-center w-full max-h-[25%] h-12 py-4 border-t-2 border-[#F5EBDC]">
                                <tr className="flex items-center justify-end px-6 w-full h-full font-bold text-[#3B1206] text-base max-[690px]:text-sm">
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
                                    <td className="flex w-full"></td>
                                </tr>
                            </tfoot>
                        }
                    </table>
                </div>
            }

            <Transition appear show={isOpen} >
                <Dialog as="div" className={usuario.perfil === "COZINHA" ? "absolute top-20 right-0 z-10 w-screen focus:outline-none" : "absolute inset-0 z-10 w-screen focus:outline-none"}
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
                            <DialogPanel className="flex justify-center rounded-xl h-3/4 w-full max-[440px]:max-w-full max-w-3xl p-10 max-[440px]:p-2">

                                <div className="container h-full w-full flex justify-center items-center">
                                    <div className={ usuario.perfil === "COZINHA" ? "modalItemPedidoCozinha rounded-xl max-[440px]:p-2" : "modalItemPedido rounded-xl max-[440px]:p-2" }>
                                        <div className="flex justify-between my-2">
                                            <div className="identificacao">
                                                <p className="text-[#3B1206]">Mesa {currentPedido.mesa.numero}</p>
                                            </div>
                                            <X size={32} color="#3B1206" onClick={() => setIsOpen(false)} />
                                        </div>
                                        <div className="div rounded-xl bg-white/5 border-2 border-[#F5EBDC] overflow-hidden backdrop-blur-2xl w-full flex-1 flex-col justify-center">
                                            <ListaItemPedido item={currentItems} pedido={currentPedido} />
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