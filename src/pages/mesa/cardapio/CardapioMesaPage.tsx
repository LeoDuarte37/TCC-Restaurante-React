
import { useContext, useEffect, useState } from "react";
import ListaCategoria from "../../../components/cardapio/categoria/lista/ListaCategoria";
import Sidebar from "../../../components/sidebar/Sidebar";
import { MesaContext } from "../../../contexts/MesaContext";
import Categoria from "../../../models/categoria/Categoria";
import { buscarCardapio } from "../../../services/Service";

function CardapioPage() {

    const { mesa, } = useContext(MesaContext);

    const [categorias, setCategorias] = useState<Array<Categoria>>([]);

    async function getCardapio() {
        await buscarCardapio(`/categoria/listar/disponiveis/restaurante/${mesa.restauranteId}`, setCategorias);
    }

    useEffect(() => {
        getCardapio();
    }, [])

    return (
        <>
            {mesa.id > 0 &&
                <div className="flex h-full bg-[#f8f8f8]">
                    <Sidebar />
                    <div className="bg-[#3B1206] w-1 h-full"></div>
                    <ListaCategoria categorias={categorias} />
                </div>
            }
        </>
    );
}

export default CardapioPage;