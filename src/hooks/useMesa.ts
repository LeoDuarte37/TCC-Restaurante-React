import { useContext } from "react";
import { MesaContext } from "../contexts/MesaContext";
import Mesa from "../models/Mesa";
import { atualizarChamarGarcom } from "../services/Service";
import toastAlert from "../utils/toastAlert";

export default function useMesa() {

    const { mesa, atualizarMesa } = useContext(MesaContext);

    async function chamarGarcom() {
        const table: Mesa = {
            id: mesa.id,
            chamarGarcom: !mesa.chamarGarcom,
        }

        atualizarChamarGarcom(table, atualizarMesa);
    }

    return { chamarGarcom };
}