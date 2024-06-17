import { useContext, useState } from "react";
import { MesaContext } from "../contexts/MesaContext";
import { atualizarChamarGarcom} from "../services/Service";
import toastAlert from "../utils/toastAlert";
import Mesa from "../models/mesa/Mesa";

export default function useMesa() {

    const { mesa, atualizarMesa } = useContext(MesaContext);

    const [mesaResponse, setMesaResponse] = useState<Mesa>({} as Mesa);

    async function chamarGarcom(mesaId: number) {
        try {
            if (mesa.chamarGarcom == false) {
                await atualizarChamarGarcom(mesaId, atualizarMesa);
                return toastAlert("Garçom contatado! Aguarde!", "info");
            } else {
                return toastAlert("Garçom já foi contatado! Aguarde!", "info");
            }
        } catch (error: any) {
            toastAlert("Erro ao chamar garçom! Por favor, tente novamente!", "erro");
        }
    }

    async function atenderMesa(mesaId: number) {
        try {
            await atualizarChamarGarcom(mesaId, setMesaResponse);
            toastAlert("Mesa atendida com sucesso!", "sucesso");
        } catch (error: any) {
            toastAlert("Erro ao atender mesa! Por favor, tente novamente!", "erro");
        }
    }

    return { chamarGarcom, atenderMesa };
}