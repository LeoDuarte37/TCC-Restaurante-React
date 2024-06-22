import { useContext, useEffect, useState } from "react";
import { LoginContext } from "../../../contexts/LoginContext";
import CardPedido from "../card/CardPedido";
import Pedido from "../../../models/pedido/Pedido";
import { Button } from "@headlessui/react";
import Item from "../../../models/pedido/item/Item";
import usePedido from "../../../hooks/usePedido";
import ModalFecharContaCaixa from "../modal/ModalFecharContaCaixa";
import { useLocation } from "react-router-dom";
import ModalListaPedido from "../modal/ModalListaPedido";

function ListaPedido(props: { pedidos: Array<Pedido> }) {
    const { login } = useContext(LoginContext);

    const { getTotalPedidos } = usePedido();

    const location = useLocation();

    const [currentPedido, setCurrentPedido] = useState<Pedido>(props.pedidos[0]);
    const [currentItems, setCurrentItems] = useState<Array<Item>>([])

    const [total, setTotal] = useState<number>(0);
    const [quantidade, setQuantidade] = useState<number>(0);

    const [isOpen, setIsOpen] = useState<boolean>(false);
    const [isOpenMesa, setIsOpenMesa] = useState<boolean>(false);

    function renderModal(pedido: Pedido) {
        setIsOpen(true);
        setCurrentPedido(pedido);
        setCurrentItems(pedido.item);
    }

    async function totalPedidos() {
        const [valor, qtd] = await getTotalPedidos(props.pedidos);
        setTotal(valor);
        setQuantidade(qtd);
    }

    const [largura, setLargura] = useState<number>(window.innerWidth);

    addEventListener("resize", () => setLargura(window.innerWidth));

    function renderItens() {
        if (login.perfil === "COZINHA") {
            return (
                <ul className="flex w-full h-full m-4 p-4 max-[690px]:p-2 border-2 border-[#3B1206] rounded-lg">
                    {props.pedidos && props.pedidos.map((pedido: Pedido) => (
                        <li key={pedido.id} onClick={() => renderModal(pedido)} className="buttonCozinha mx-2 text-nowrap flex flex-col justify-center items-center max-[460px]:max-w-full" >
                            <p>Mesa</p>
                            {pedido.mesa.numero}
                        </li>
                    ))}
                </ul>
            )
        } else {
            if (props.pedidos) {
                return props.pedidos.map((pedido: Pedido) => (
                    <tr key={pedido.id} className="flex text-[#3B1206] text-base max-[690px]:text-sm">
                        <CardPedido pedido={pedido} />
                        <td className="flex justify-center w-full">
                            <Button onClick={() => renderModal(pedido)} className="button text-base h-8 m-0 p-0 flex justify-center items-center xl:w-28 max-[540px]:w-12 max-[1300px]:w-24 max-[540px]:text-[14px]">
                                {largura < 540 ? "Ver" : "Itens"}
                            </Button>
                        </td>
                    </tr>
                ));
            }
        }
    }

    useEffect(() => {
        totalPedidos();
        renderItens();
    }, [props.pedidos])

    return (

        <>
            {login.perfil === "COZINHA" ? renderItens()

                : <div className="flex flex-col w-full max-w-6xl max-[650px]:max-w-full h-full overflow-hidden shadow-md rounded-lg">
                    <table className="table-auto flex flex-col w-full max-h-full h-full bg-[#F8F8F8] text-left rtl:text-right rounded-lg overflow-hidden border-2 border-[#F5EBDC]">
                        <thead className="h-12 font-semibold text-center text-base text-[#F8F8F8] uppercase bg-[#3B1206] max-[690px]:text-sm">
                            <tr className="flex justify-between w-full h-full ">
                                <th scope="col" className="w-full h-full flex justify-center items-center p-0">
                                    <p className="text-center max-[800px]:w-14">
                                        {largura > 800 ? "Cód. Pedido" : "Pedido"}
                                    </p>
                                </th>
                                <th scope="col" className="w-full h-full flex justify-center items-center p-0 ">
                                    <p>
                                        Mesa
                                    </p>
                                </th>
                                <th scope="col" className="w-full h-full flex justify-center items-center p-0">
                                    <p>
                                        {login.perfil === "GARCOM" ? "Hora" : "Data"}
                                    </p>
                                </th>
                                {login.perfil === "GARCOM" ? <></> :
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
                            {props.pedidos && renderItens()} 
                        </tbody>
                        {(login.perfil === "CAIXA" || login.perfil === "ADMIN" || login.perfil === "ROOT") &&
                            <tfoot className="flex flex-1 items-center w-full max-h-[25%] h-12 py-4 border-t-2 border-[#F5EBDC]">
                                <tr className="flex items-center justify-end w-full h-full font-bold text-[#3B1206] text-base max-[690px]:text-sm">
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
                                    {location.pathname == "/mesas" ?
                                        <td onClick={() => setIsOpenMesa(true)} className="bg-[#D42300] hover:bg-[#b51f02] text-white w-full text-center font-semibold py-1 mr-2 rounded h-8">
                                            Fechar Conta
                                        </td>
                                        : <td className="flex w-full"></td>
                                    }
                                </tr>
                            </tfoot>
                        }
                    </table>
                </div>
            }

            <ModalFecharContaCaixa mesaId={props?.pedidos[0]?.mesa.id} isOpen={isOpenMesa} setIsOpen={setIsOpenMesa} />

            <ModalListaPedido currentPedido={currentPedido} currentItems={currentItems} isOpen={isOpen} setIsOpen={setIsOpen} />
        </>
    );
}

export default ListaPedido;