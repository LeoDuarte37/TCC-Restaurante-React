import { useEffect, useState } from "react";
import ListaItemPedido from "../../../components/compras/itemPedido/lista/ListaItemPedido";
import Sidebar from "../../../components/sidebar/Sidebar";
import Item from "../../../models/Item";

function ContaMesaPage() {

    const contaStorage = JSON.parse(localStorage.getItem("conta") || "[]");

    const [ itens, setItens ] = useState<Array<Item>>(contaStorage);

    useEffect(() => {
        setItens(contaStorage);
    }, [contaStorage]);

    return (
        <div className="flex h-full">
            <Sidebar />

            <div className="flex flex-col items-center gap-8 mt-10 w-full h-full">
                <h1 className="text-gray-800 font-bold text-3xl">Pedidos realizados</h1>
                <ListaItemPedido itens={itens} />
                <button className="button">Fechar conta</button>
            </div>
        </div>
    )
}

export default ContaMesaPage;