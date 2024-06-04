import { useContext, useState } from "react";
import { MesaContext } from "../contexts/MesaContext";
import Mesa from "../models/Mesa";
import { atualizarChamarGarcom, buscarMesaPorId } from "../services/Service";
import toastAlert from "../utils/toastAlert";

export default function useMesa() {

    const { handleMesaLogout } = useContext(MesaContext);

    const [ mesa, setMesa ] = useState<Mesa>()

    async function chamarGarcom(mesaId: number, chamar: boolean, setDados: Function) {
        const table: Mesa = {
            id: mesaId,
            chamarGarcom: chamar,
        }
        
        try {
            await buscarMesaPorId(table.id, setMesa);

            if (mesa?.id == mesaId) {
                if (mesa.chamarGarcom == chamar) {
                    toastAlert("Garçom já contatado! Aguarde!", "info");
                } else {
                    await atualizarChamarGarcom(table, setDados);
                }
            }

        } catch (error: any) {
            if (error.toString().includes("403")) {
                toastAlert("Faça login novamente!", "info");
                handleMesaLogout();
            }   
        }
    }

    return { chamarGarcom };
}