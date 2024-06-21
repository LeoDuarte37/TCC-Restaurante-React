import Mesa from "../../../models/mesa/Mesa";
import { useContext, useEffect, useState } from "react";
import { LoginContext } from "../../../contexts/LoginContext";
import useMesa from "../../../hooks/useMesa";
import Pedido from "../../../models/pedido/Pedido";
import { buscarPedidosPorStatusOuMesa, fecharConta } from "../../../services/Service";
import { RotatingLines } from "react-loader-spinner";
import toastAlert from "../../../utils/toastAlert";
import { useNavigate } from "react-router-dom";
import ListarPedidosPorMesaAndStatus from "../../../models/pedido/ListarPedidosPorMesaAndStatus";
import ModalPedidoMesa from "../modal/ModalPedidoMesa";

function CardMesa(props: { mesa: Mesa; getInfo: Function }) {

    const { login, handleLogout } = useContext(LoginContext);
    const { atenderMesa } = useMesa();

    const navigate = useNavigate();

    const [pedidos, setPedidos] = useState<Array<Pedido>>([]);

    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [isOpen, setIsOpen] = useState<boolean>(false);

    function atender() {
        atenderMesa(props.mesa.id);
        props.getInfo();
    }

    async function getPedidosByMesa() {
        try {
            setIsLoading(true);

            const listarPedidosPorMesaAndStatus: ListarPedidosPorMesaAndStatus = {
                mesa: props.mesa.id,
                statusPedidos: ["R", "F", "E"]
            }

            await buscarPedidosPorStatusOuMesa(`/pedido/listar/mesa`, listarPedidosPorMesaAndStatus, setPedidos, {
                headers: {
                    Authorization: login.token,
                },
            });

            setIsLoading(false);
            setIsOpen(true);
        } catch (error: any) {
            if (error.toString().includes('403')) {
                toastAlert("Por favor, faça login novamente!", "info");
                handleLogout();
                navigate('/');
            }
        }
    }

    useEffect(() => {
        getPedidosByMesa;
    }, [pedidos])

    async function fecharMesa() {
        try {
            await fecharConta(props.mesa.id, {
                headers: {
                    Authorization: `Bearer ${login.token}`,
                },
            });
            props.getInfo();
        } catch (error) {
            toastAlert("Erro ao fechar conta! Tente novamente.", "erro");
        }
    }

    return (
        <>
            {login.perfil === "GARCOM"
                ? <button onClick={atender} className="button w-32 h-16 flex flex-col justify-center items-center">
                    <p>Mesa</p>
                    {props.mesa.numero}
                </button>

                : <>
                    {props.mesa.status === "DISPONIVEL"
                        ? <button onClick={getPedidosByMesa} className="mesaDisponivel">
                            <p>Mesa</p>
                            <p>
                                {!isLoading ? props.mesa.numero
                                    : <RotatingLines
                                        strokeColor="white"
                                        strokeWidth="5"
                                        animationDuration="0.75"
                                        width="24"
                                        visible={true}
                                    />
                                }
                            </p>
                        </button>

                        : <button onClick={getPedidosByMesa} className={props.mesa.status === "ABERTA" ? "mesaAberta" : "mesaPendente"}>
                            <p>Mesa</p>
                            <p>
                                {!isLoading ? props.mesa.numero
                                    : <RotatingLines
                                        strokeColor="white"
                                        strokeWidth="5"
                                        animationDuration="0.75"
                                        width="24"
                                        visible={true}
                                    />
                                }
                            </p>
                        </button>
                    }
                </>
            }

            <ModalPedidoMesa pedidos={pedidos} isOpen={isOpen} setIsOpen={setIsOpen} />
        </>
    );
}

export default CardMesa;