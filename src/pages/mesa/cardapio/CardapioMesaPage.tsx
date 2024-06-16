
import { useContext } from "react";
import ListaCategoria from "../../../components/cardapio/categoria/lista/ListaCategoria";
import Sidebar from "../../../components/sidebar/Sidebar";
import { MesaContext } from "../../../contexts/MesaContext";

function CardapioPage() {
    const { mesa } = useContext(MesaContext);

    return (
        <>
            {mesa.id > 0 &&
                <div className="flex h-full bg-[#f8f8f8]">
                    <Sidebar />
                    <div className="bg-[#3B1206] w-1 h-full"></div>
                    <ListaCategoria />
                </div>
            }
        </>
    );
}

export default CardapioPage;