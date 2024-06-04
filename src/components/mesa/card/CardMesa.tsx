import { Button } from "@headlessui/react";
import Mesa from "../../../models/Mesa";
import useMesa from "../../../hooks/useMesa";
import { MesaContext } from "../../../contexts/MesaContext";
import { useContext } from "react";

function CardMesa(props: { mesa: Mesa; getInfo: Function }) {

    const { atualizarMesa } = useContext(MesaContext);
    const { chamarGarcom } = useMesa();

    function mesaAtendida() {
        chamarGarcom(props.mesa.id, false, atualizarMesa);
        props.getInfo();
    }

    return (
        <Button onClick={ mesaAtendida } className="button w-32 h-16">
            { props.mesa.numero }
        </Button>
    );
}

export default CardMesa;