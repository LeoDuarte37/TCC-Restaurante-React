import { useContext, useEffect, useState } from "react";
import Sidebar from "../../../components/sidebar/Sidebar";
import Item from "../../../models/pedido/item/Item";
import ListaItemPedido from "../../../components/pedido/itemPedido/lista/ListaItemPedido";
import { MesaContext } from "../../../contexts/MesaContext";
import ModalFecharConta from "../../../components/pedido/modal/ModalFecharConta";

function ContaMesaPage() {

    const { mesa } = useContext(MesaContext);

    const [itens, setItens] = useState<Array<Item>>([]);

    useEffect(() => {
        const conta: Array<Item> = JSON.parse(localStorage.getItem("conta") || "[]");
        setItens(conta);
    }, []);

    return (
        <>
            {mesa.id > 0 &&
                <div className="flex h-full">
                    <Sidebar />

                    <div className="flex flex-col items-center gap-6 mt-6 w-full h-full bg-[#F8F8F8]">
                        <h1 className="subCategoriaTitle text-[#D42300] font-bold text-3xl">Pedidos realizados</h1>
                        <div className="flex flex-col max-h-80 h-full w-[80%] max-w-3xl relative overflow-hidden shadow-md rounded-lg">
                            <ListaItemPedido item={itens} />
                        </div>

                        <ModalFecharConta />
                    </div>
                </div>
            }
        </>
    )
}

export default ContaMesaPage;