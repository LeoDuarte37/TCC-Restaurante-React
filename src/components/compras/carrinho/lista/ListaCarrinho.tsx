import { DialogTitle } from "@headlessui/react";
import { useState, useEffect, useContext } from "react";
import { MesaContext } from "../../../../contexts/MesaContext";
import usePedido from "../../../../hooks/usePedido";
import toastAlert from "../../../../utils/toastAlert";
import Pedido from "../../../../models/Pedido";
import Item from "../../../../models/Item";
import CardCarrinho from "../card/CardCarrinho";

function ListaCarrinho() {

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

        const pedido = JSON.parse(localStorage.getItem("item") || "[]");
        setItens(pedido);

        setIsLoading(false);
    }

    function renderItens() {
        return itens.map((item: Item) => (
            <li key={item.produto.id}>
                <CardCarrinho item={item} getSubTotal={getSubTotal} />
            </li>
        ));
    }

    function submitPedido() {
        const pedido: Pedido = {
            mesa: mesa,
            item: itens,
        };

        // enviarPedido(pedido);
        const conta = JSON.parse(localStorage.getItem("conta") || "[]");
        localStorage.setItem("conta", JSON.stringify([...conta, itens]));

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

                <button onClick={submitPedido} className="button mt-2">
                    Enviar pedidos
                </button>
            </div>
        </div>
    );
}

export default ListaCarrinho;