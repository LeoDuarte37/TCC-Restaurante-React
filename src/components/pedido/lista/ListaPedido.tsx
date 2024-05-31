import { DialogTitle } from "@headlessui/react";
import { useState, useEffect, useContext } from "react";
import usePedido from "../../../hooks/usePedido";
import Item from "../../../models/Item";
import CardPedido from "../card/CardPedido";
import Pedido from "../../../models/Pedido";
import { MesaContext } from "../../../contexts/MesaContext";
import { enviarPedido } from "../../../services/Service";
import toastAlert from "../../../utils/toastAlert";
import "./ListaPedido.css"

function ListaPedido(props: { page: string }) {

    const { mesa } = useContext(MesaContext);
    const { totalPedido, clearPedido, total } = usePedido();

    const [itens, setItens] = useState<Array<Item>>([]);
    const [isLoading, setIsLoading] = useState(false);
    const [subTotal, setSubTotal] = useState<number>(total);

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
        if (props.page === "Pedidos") {
            return itens.map((item: Item) => (
                <li key={item.produto.id}>
                    <CardPedido item={item} page={props.page} getSubTotal={getSubTotal} />
                </li>
            ));
        } else if (props.page === "ContaMesa") {
            return itens.map((item: Item) => (
                <tr key={item.produto.id} className="flex bg-white dark:bg-gray-800">
                    <CardPedido item={item} page={props.page} getSubTotal={getSubTotal} />
                </tr>
            ));
        }
    }

    function submitPedido() {
        const pedido: Pedido = {
            mesa: mesa,
            item: itens,
        };

        // enviarPedido(pedido);
        toastAlert("Pedido enviado com sucesso!", "sucesso");
        clearPedido();
        getSubTotal();
        getItens();
    }

    useEffect(() => {
        getSubTotal();
        getItens();
    }, [total]);

    return (
        <>
            {props.page === "Pedidos" ?
                <div className="flex h-full flex-col bg-white py-6 shadow-xl">
                    <div className="px-4 sm:px-6">
                        <DialogTitle className="text-base font-semibold leading-6 text-gray-900">Meus pedidos</DialogTitle>
                    </div>
                    <ul role="list" className="relative mt-6 flex-1 px-4 sm:px-6 overflow-auto">
                        {isLoading ? <></> : renderItens()}
                    </ul>

                    <div className="border-t border-gray-200 px-4 pt-6 sm:px-6">
                        <div className="flex justify-between text-base font-medium text-gray-900">
                            <p>Subtotal</p>
                            <p>R$ {isLoading ? 0 : subTotal}</p>
                        </div>

                        <p className="mt-0.5 text-sm text-gray-500">Impostos calculados na finalização da compra.</p>

                        <button onClick={submitPedido} className="buttonPedidos mt-2">
                            Enviar pedidos
                        </button>
                    </div>
                </div>

                : <>
                    { props.page === "ContaMesa" &&
                        <div className="flex flex-col max-h-80 h-full relative overflow-hidden shadow-md rounded-lg">
                            <table className="flex flex-col w-full h-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                                <thead className="h-10 text-xs text-gray-700 uppercase bg-gray-100 dark:bg-gray-700 dark:text-gray-400">
                                    <tr>
                                        <th scope="col" className="px-6 py-3">
                                            Nome produto
                                        </th>
                                        <th scope="col" className="px-6 py-3">
                                            Qtd
                                        </th>
                                        <th scope="col" className="px-6 py-3">
                                            Valor unitário
                                        </th>
                                    </tr>
                                </thead>
                                <tbody className="overflow-auto w-full max-h-60 h-full">
                                    {isLoading ? <></> : renderItens()}
                                </tbody>
                                <tfoot className="flex">
                                    <tr className="flex items-center w-full h-12 font-semibold text-gray-900">
                                        <th scope="row" className="px-6 text-base w-[40%]">Total</th>
                                        <td className="px-6 text-center w-[20%]">3</td>
                                        <td className="px-6 text-center w-[40%]">R$ 21,000</td>
                                    </tr>
                                </tfoot>
                            </table>
                        </div>
                    }
                </>
            }
        </>
    );
}

export default ListaPedido;