import { DialogTitle } from "@headlessui/react";
import { useState, useEffect, useContext } from "react";
import usePedido from "../../../hooks/usePedido";
import Item from "../../../models/Item";
import CardPedido from "../card/CardPedido";
import Pedido from "../../../models/Pedido";
import { MesaContext } from "../../../contexts/MesaContext";
import { enviarPedido } from "../../../services/Service";
import toastAlert from "../../../utils/toastAlert";

function ListaPedido(props: { page: string }) {

    const { mesa } = useContext(MesaContext);
    const { totalPedido, clearPedido } = usePedido();

    const [itens, setItens] = useState<Array<Item>>([]);
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
                <CardPedido item={item} getSubTotal={getSubTotal} />
            </li>
        ));
    }

    function submitPedido() {
        const pedido : Pedido = {
            mesa: mesa,
            item: itens,
        };

        // enviarPedido(pedido);
        toastAlert("Pedido enviado com sucesso!", "sucesso");
        clearPedido();
    }

    useEffect(() => {
        getSubTotal();
        getItens();
    }, [open]);

    return (
        <div className="flex h-full flex-col bg-white py-6 shadow-xl">
            <div className="px-4 sm:px-6">
                <DialogTitle className="text-base font-semibold leading-6 text-gray-900">Meus pedidos</DialogTitle>
            </div>
            <ul role="list" className="relative mt-6 flex-1 px-4 sm:px-6 overflow-auto">
                {isLoading ? <></> : renderItens()}
            </ul>

            <div className="border-t border-gray-200 px-4 py-6 sm:px-6">
                <div className="flex justify-between text-base font-medium text-gray-900">
                    <p>Subtotal</p>
                    <p>R$ {isLoading ? 0 : subTotal}</p>
                </div>

                <p className="mt-0.5 text-sm text-gray-500">Impostos calculados na finalização da compra.</p>

                <div onClick={submitPedido} className="mt-6 flex items-center justify-center rounded-md border border-transparent bg-indigo-600 px-6 py-3 text-base font-medium text-white shadow-sm hover:bg-indigo-700">
                    Enviar pedidos
                </div>
            </div>
        </div>
    )
}

export default ListaPedido;