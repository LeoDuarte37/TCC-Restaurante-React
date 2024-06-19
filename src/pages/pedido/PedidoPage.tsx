import { useContext, useEffect, useState } from "react";
import ListaPedido from "../../components/pedido/lista/ListaPedido";
import { LoginContext } from "../../contexts/LoginContext";
import Pedido from "../../models/pedido/Pedido";
import { buscarPedidosPorStatusOuMesa, buscarPedidosPorRestaurante } from "../../services/Service";
import toastAlert from "../../utils/toastAlert";
import { useNavigate } from "react-router-dom";
import Status from "../../models/Status";

function PedidoPage() {
    const navigate = useNavigate();

    const { login, handleLogout } = useContext(LoginContext);

    const [pedidos, setPedidos] = useState<Array<Pedido>>([]);

    async function getPedidos() {
        switch (login.perfil) {
            case "COZINHA":

                try {
                    const statusCozinha: Status = { id: login.restauranteId, status: "R", }

                    await buscarPedidosPorStatusOuMesa(`/pedido/listar/status`, statusCozinha, setPedidos, {
                        headers: {
                            Authorization: `Bearer ${login.token}`,
                        },
                    });
                } catch (error: any) {
                    if (error.toString().includes("403")) {
                        handleLogout();
                    }
                }

                break;

            case "GARCOM":

                try {
                    const statusGarcom: Status = { id: login.restauranteId, status: "F", }

                    await buscarPedidosPorStatusOuMesa(`/pedido/listar/status`, statusGarcom, setPedidos, {
                        headers: {
                            Authorization: `Bearer ${login.token}`,
                        },
                    });
                } catch (error: any) {
                    if (error.toString().includes("403")) {
                        handleLogout();
                    }
                }

                break;

            case "CAIXA":
                try {
                    await buscarPedidosPorRestaurante(`/pedido/listar/data/corrente/restaurante/${login.restauranteId}`, setPedidos, {
                        headers: {
                            Authorization: `Bearer ${login.token}`,
                        },
                    });

                } catch (error: any) {
                    if (error.toString().includes("403")) {
                        handleLogout();
                    }
                }

                break;

            case "ADMIN":
                try {
                    await buscarPedidosPorRestaurante(`/pedido/listar/restaurante/${login.restauranteId}`, setPedidos, {
                        headers: {
                            Authorization: `Bearer ${login.token}`,
                        },
                    });

                } catch (error: any) {
                    if (error.toString().includes("403")) {
                        handleLogout();
                    }
                }

                break;

            case "ROOT":
                try {
                    await buscarPedidosPorRestaurante(`/pedido/listar/restaurante/${login.restauranteId}`, setPedidos, {
                        headers: {
                            Authorization: `Bearer ${login.token}`,
                        },
                    });

                    // console.log(pedidos)

                } catch (error: any) {
                    if (error.toString().includes("403")) {
                        handleLogout();
                    }
                }

                break;

            default: break;
        }
    }

    useEffect(() => {
        getPedidos();
    }, [])

    setTimeout(() => {
        getPedidos();
    }, 5000);

    useEffect(() => {
        if (login.token === '') {
            toastAlert('Você precisa logar novamente', 'info');
            navigate('/');
        }
    }, [login.token]);

    return (
        <>
            {login.perfil != '' &&
                <div className="bg-[#F8F8F8] w-full h-full flex flex-col gap-4 items-center px-4 pb-4 my-2 max-[768px]:px-2 max-[768px]:pb-2">
                    {login.perfil === "COZINHA" ? <></> :
                        <h1 className="text-[#D42300] subCategoriaTitle text-3xl font-bold mt-4 max-[1600px]:mt-4">
                            {login.perfil === "GARCOM" ? "Pedidos prontos" : "Histórico de pedidos"}
                        </h1>
                    }

                    <div className={login.perfil === "COZINHA" ? "bg-[#F8F8F8] w-full h-4/6 max-[1600px]:h-5/6 flex flex-col justify-center items-center"
                        : "bg-[#F8F8F8] w-full h-full max-h-[70%] flex flex-col justify-center items-center"}>
                        <ListaPedido pedidos={pedidos} />
                    </div>
                </div>
            }
        </>
    )
}

export default PedidoPage;