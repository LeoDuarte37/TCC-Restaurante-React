import { useState } from "react";
import Mesa from "../models/Mesa";
import toastAlert from "../utils/toastAlert";

export default function useMesa() {

    const [isModified, setIsModified] = useState<boolean>(false);

    async function addMesa(mesa: Mesa) {
        const storageMesa = JSON.parse(localStorage.getItem("mesa") || "[]");

        const search = storageMesa.find((m: Mesa) => m.id === mesa.id);

        if (!search) {
            localStorage.setItem("mesa", JSON.stringify([...storageMesa, mesa]));
            setIsModified(!isModified);
            toastAlert("Chamando garçom. Aguarde...", "sucesso");

            return isModified;
        } else {
            toastAlert("Chamada já solicitada!", "erro");
            return;
        }
    }

    async function removeMesa(mesaId: number) {
        const storageMesa = JSON.parse(localStorage.getItem("mesa") || "[]");

        const search = storageMesa.find((mesa: Mesa) => mesa.id === mesaId);

        if (search) {
            const filterList = storageMesa.find((mesa: Mesa) => mesa.id != mesaId);
            localStorage.setItem("mesa", JSON.stringify(filterList));
            setIsModified(!isModified);

            return isModified;
        }
    }

    return { isModified, addMesa, removeMesa };
}