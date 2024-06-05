import Mesa from "../../../models/Mesa";
import useMesa from "../../../hooks/useMesa";
import { MesaContext } from "../../../contexts/MesaContext";
import { useContext, useEffect } from "react";
import { LoginContext } from "../../../contexts/LoginContext";

function CardMesa(props: { mesa: Mesa; getInfo: Function }) {

    const { usuario } = useContext(LoginContext);
    const { mesaAtendida } = useMesa();

    useEffect(() => {
        props.getInfo();
    }, [props.mesa])

    return (
        <>
            { usuario.perfil === "GARCOM" && 
                <button onClick={() => mesaAtendida(props.mesa.id)} className="button w-32 h-16">
                    { props.mesa.numero }
                </button>
            }
        </>
    );
}

export default CardMesa;