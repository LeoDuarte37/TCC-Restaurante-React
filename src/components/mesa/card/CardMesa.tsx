import Mesa from "../../../models/mesa/Mesa";
import useMesa from "../../../hooks/useMesa";
import { useContext, useEffect } from "react";
import { LoginContext } from "../../../contexts/LoginContext";

function CardMesa(props: { mesa: Mesa; getInfo: Function }) {

    const { usuario } = useContext(LoginContext);
    const { chamarGarcom } = useMesa();

    useEffect(() => {
        props.getInfo();
    }, [props.mesa])

    return (
        <>
            { usuario.perfil === "GARCOM" 
                ? <button onClick={() => chamarGarcom(props.mesa.id)} className="button w-32 h-16 flex flex-col justify-center items-center">
                    <p>Mesa</p>
                    { props.mesa.numero }
                </button>
    
                : <>
                    { props.mesa.status === "DISPONIVEL" 
                        ?<button onClick={() => ("")} className="mesaDisponivel">
                            <p>Mesa</p>
                            { props.mesa.numero }
                        </button>

                        :<button onClick={() => ("")} className={props.mesa.status === "ABERTA" ? "mesaAberta" :  "mesaPendente"}>
                            <p>Mesa</p>
                            { props.mesa.numero }
                        </button>
                    }
                </>
                
                
            }
        </>
    );
}

export default CardMesa;