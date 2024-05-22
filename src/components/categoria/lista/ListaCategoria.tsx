import { useEffect, useState } from "react";
import Categoria from "../../../models/Categoria";
import { buscarCardapio } from "../../../services/Service";
import toastAlert from "../../../utils/toastAlert";
import { TailSpin } from 'react-loader-spinner';

function ListaCategoria() {
    
    const [categorias, setCategorias] = useState<Array<Categoria>>([]);

    const [carregando, setCarregando] = useState<boolean>(false);

    async function buscarCategorias() {
        try {
            setCarregando(true);
            await buscarCardapio("/categoria/listar", setCategorias);
            setCarregando(false);
        } catch (error: any) {
            if (error.toString().includes("403")) {
                toastAlert("Token expirou, favor logar novamente.", "erro");
            }
        }
    }

    useEffect(() => {
        buscarCategorias();
    }, [categorias.length]);

    return (
        <>

        </>
    )
}

export default ListaCategoria;