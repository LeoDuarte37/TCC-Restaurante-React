import { useContext, useState } from "react";
import { MesaContext } from "../contexts/MesaContext";
import Mesa from "../models/mesa/Mesa";
import { atualizarChamarGarcom, buscarMesaPorId } from "../services/Service";
import toastAlert from "../utils/toastAlert";
import mesaChamarGarcom from "../models/MesaChamarGarcom";

export default function useMesa() {

    const { mesa, atualizarMesa } = useContext(MesaContext);
    const [ mesaChamando, setMesaChamando ] = useState<Mesa>()

    async function chamarGarcom(mesaId: number) {

        const chamando: boolean = mesa.id > 0 ? true : false;
    
        const table: mesaChamarGarcom = {
            id: mesaId,
            chamarGarcom: chamando,
        }
        
        try {
            await buscarMesaPorId(table.id, setMesaChamando);

            if (mesaChamando?.id == mesaId) {
                if (mesaChamando.chamarGarcom !== table.chamarGarcom) {
                    await atualizarChamarGarcom(table, atualizarMesa);
                } else {
                    toastAlert("Garçom já contatado! Aguarde!", "info");
                }
            }
        } catch (error: any) {
            console.log(error); 
        }
    }

    return { chamarGarcom };
}