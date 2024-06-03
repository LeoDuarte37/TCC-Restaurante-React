import Mesa from "../models/Mesa";
import toastAlert from "../utils/toastAlert";

export default function useMesa() {


    async function addMesa(mesa: Mesa) {
        const storageMesa: Array<Mesa> = JSON.parse(localStorage.getItem("mesa") || "[]");

        const search: Mesa | undefined = storageMesa.find((m: Mesa) => m.id === mesa.id);

        if (search == undefined) {
            localStorage.setItem("mesa", JSON.stringify([...storageMesa, mesa]));
            toastAlert("Chamando garçom. Aguarde...", "sucesso");
        } else {
            toastAlert("Chamada já solicitada!", "erro");
            return;
        }
    }

    async function removeMesa(mesaId: number) {
        const storageMesa: Array<Mesa> = JSON.parse(localStorage.getItem("mesa") || "[]");

        const search: Mesa | undefined = storageMesa.find((mesa: Mesa) => mesa.id === mesaId);

        if (search) {
            const filterList: Array<Mesa> = storageMesa.filter((mesa: Mesa) => mesa.id != mesaId);

            if (filterList.length > 0) {
                localStorage.setItem("mesa", JSON.stringify(filterList));
            } else {
                localStorage.setItem("mesa", "[]");
            }

            toastAlert("Mesa atendida!", "sucesso");
        }
    }

    return { addMesa, removeMesa };
}