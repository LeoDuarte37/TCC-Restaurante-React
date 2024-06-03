import { useEffect, useState } from "react";
import Sidebar from "../../../components/sidebar/Sidebar";
import Item from "../../../models/Item";
import ListaItemPedido from "../../../components/pedido/itemPedido/lista/ListaItemPedido";

function ContaMesaPage() {

    const [itens, setItens] = useState<Array<Item>>([]);

    useEffect(() => {
        const conta: Array<Item> = JSON.parse(localStorage.getItem("conta") || "[]");
        setItens(conta);
    }, []);

    return (
        <div className="flex h-full">
            <Sidebar />

            <div className="flex flex-col items-center gap-8 mt-10 w-full h-full">
                <h1 className="text-gray-800 font-bold text-3xl">Pedidos realizados</h1>
                <ListaItemPedido item={itens} />
                <button className="button">Fechar conta</button>
            </div>
        </div>
    )
}

export default ContaMesaPage;