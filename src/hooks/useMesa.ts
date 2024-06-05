import { useContext, useState } from "react";
import { MesaContext } from "../contexts/MesaContext";
import Mesa from "../models/Mesa";
import { atualizarChamarGarcom, buscarMesaPorId } from "../services/Service";
import toastAlert from "../utils/toastAlert";
import { ChamandoGarcomContext } from "../contexts/ChamandoGarcomContext";

export default function useMesa() {

    const { mesas, atualizarMesas } = useContext(ChamandoGarcomContext);

    // const [ mesa, setMesa ] = useState<Mesa>()

    async function chamar(mesa: Mesa) {    
        const findMesa = mesas.find((m) => m.id === mesa.id);

        if (findMesa) {
            return toastAlert("Garçom já contatado! Aguarde...", "info");
        } else {
            atualizarMesas([...mesas, mesa]);
            return toastAlert("Chamando garçom! Aguarde...", "sucesso");
        }
    }

    async function mesaAtendida(mesaId: number) {
        const updateListMesa = mesas.filter((m) => m.id !== mesaId);
        atualizarMesas(updateListMesa);
    }

    // async function chamarGarcom(mesaId: number, chamar: boolean, setDados: Function) {
    //     const table: Mesa = {
    //         id: mesaId,
    //         chamarGarcom: chamar,
    //     }
        
    //     try {
    //         await buscarMesaPorId(table.id, setMesa);

    //         if (mesa?.id == mesaId) {
    //             if (mesa.chamarGarcom == chamar) {
    //                 toastAlert("Garçom já contatado! Aguarde!", "info");
    //             } else {
    //                 await atualizarChamarGarcom(table, setDados);
    //             }
    //         }

    //     } catch (error: any) {
    //         if (error.toString().includes("403")) {
    //             toastAlert("Faça login novamente!", "info");
    //             handleMesaLogout();
    //         }   
    //     }
    // }

    return { chamar, mesaAtendida, mesas };
}