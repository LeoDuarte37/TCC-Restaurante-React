import Mesa from "../../../models/mesa/Mesa";
import { useContext, useEffect, useState } from "react";
import { LoginContext } from "../../../contexts/LoginContext";
import { RotatingLines } from "react-loader-spinner";

function CardMesa(props: { mesa: Mesa; isLoading: boolean }) {

    const { login } = useContext(LoginContext);

    const [styleMesa, setStyleMesa] = useState<string>('');

    function changeStyleMesa() {
        if (props.mesa.status === "DISPONIVEL") {
            setStyleMesa('mesaDisponivel');

        } else if (props.mesa.status === "ABERTA") {
            setStyleMesa('mesaAberta');

        } else {
            setStyleMesa('mesaPendente');
        }
    }

    useEffect(() => {
        changeStyleMesa();
    }, [props.mesa]);

    useEffect(() => {
        changeStyleMesa();
    }, []);

    return (
        <>
            {login.perfil === "GARCOM"
                ? <button className="button w-32 h-16 flex flex-col justify-center items-center">
                    <p>Mesa</p>
                    {props.mesa.numero}
                </button>

                : <button className={styleMesa}>
                    {!props.isLoading ?
                        <>
                            <p>Mesa</p>
                            <p>
                                {props.mesa.numero}
                            </p>
                        </>
                        : <RotatingLines
                            strokeColor="white"
                            strokeWidth="5"
                            animationDuration="0.75"
                            width="24"
                            visible={true}
                        />
                    }
                </button>
            }
        </>
    );
}

export default CardMesa;