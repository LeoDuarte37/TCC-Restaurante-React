import Mesa from "../../../models/Mesa";
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
                        ? <button onClick={() => ("")} className="button w-32 h-16 flex flex-col justify-center items-center bg-green-500">
                            <p>Mesa</p>
                            { props.mesa.numero }
                        </button>

                        : <>
                            { props.mesa.status === "ABERTA"  
                                ? <button onClick={() => ("")} className="button w-32 h-16 flex flex-col justify-center items-center bg-yellow-500 shadow-violet-200 hover:bg-violet-600 active:bg-violet-700">
                                    <p>Mesa</p>
                                    { props.mesa.numero }
                                </button>
                            
                                : <button onClick={() => ("")} className="button w-32 h-16 flex flex-col justify-center items-center bg-red-600 hover:bg-violet-600 active:bg-violet-700">
                                    <p>Mesa</p>
                                    { props.mesa.numero }
                                </button>
                            }
                        </>
                    }
                </>
            }
        </>
    );
}

export default CardMesa;