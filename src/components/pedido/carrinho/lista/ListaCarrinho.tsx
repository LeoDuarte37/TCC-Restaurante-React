import { DialogTitle } from "@headlessui/react";
import { useState, useEffect, useContext } from "react";
import { MesaContext } from "../../../../contexts/MesaContext";
import usePedido from "../../../../hooks/usePedido";
import Item from "../../../../models/pedido/item/Item";
import CardCarrinho from "../card/CardCarrinho";
import AddPedido from "../../../../models/pedido/AddPedido";

function ListaCarrinho() {

    const { mesa } = useContext(MesaContext);

    const { totalPedido, submitPedido, total, clearPedido } = usePedido();

    const [itens, setItens] = useState<Array<Item>>([]);
    const [isLoading, setIsLoading] = useState(false);
    const [subTotal, setSubTotal] = useState<number>(total);

    async function getSubTotal() {
        const valor = await totalPedido();
        setSubTotal(valor);
    }

    function getItens() {
        setIsLoading(true);

        const itensPedido = JSON.parse(localStorage.getItem("item") || "[]");
        setItens(itensPedido);

        setIsLoading(false);
    }

    function renderItens() {
        return itens.map((item: Item) => (
            <li key={item.produto.id}>
                <CardCarrinho item={item} getSubTotal={getSubTotal} />
            </li>
        ));
    }

    async function submit() {
        getItens();

        const addPedido: AddPedido = {
            mesa: { id: mesa.id },
            item: itens,
        };

        await submitPedido(addPedido);
        clearPedido();

        getSubTotal();
        getItens();
    }

    useEffect(() => {
        getSubTotal();
        getItens();
    }, [total]);

    return (
        <div className="flex h-full flex-col bg-[#F8F8F8] py-6 shadow-xl">
            <div className="px-4 sm:px-6">
                <DialogTitle className="text-[#D42300] subCategoriaTitle leading-6">Meus pedidos</DialogTitle>
            </div>
            <ul role="list" className="relative mt-6 flex-1 px-4 sm:px-6 overflow-auto">
                {isLoading ? <></> : renderItens()}
            </ul>

            <div className="border-t-2 border-[#F5EBDC] max-h-40 h-full flex flex-col gap-4 px-4 py-6 sm:px-6">
                <div>
                    <div className="flex justify-between text-base font-bold text-[#3B1206]">
                        <p>Subtotal</p>
                        <p>R$ {isLoading ? 0 : subTotal}</p>
                    </div>

                    <p className="mt-0.5 text-sm text-[#3B1206]">Impostos calculados na finalização da compra.</p>
                </div>

                <button onClick={submit} className="button self-center">
                    Enviar pedidos
                </button>
            </div>
        </div>
    );
}

export default ListaCarrinho;