import { Button } from "@headlessui/react";
import Mesa from "../../../models/Mesa";
import useMesa from "../../../hooks/useMesa";

function CardMesa(props: { mesa: Mesa; getInfo: Function }) {

    const { removeMesa } = useMesa();

    function mesaAtendida() {
        removeMesa(props.mesa.id)
        props.getInfo();
    }

    return (
        <Button onClick={ mesaAtendida } className="button w-32 h-16">
            { props.mesa.numero }
        </Button>
    );
}

export default CardMesa;