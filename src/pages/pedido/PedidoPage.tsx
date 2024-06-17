import { useContext, useEffect, useState } from "react";
import ListaPedido from "../../components/pedido/lista/ListaPedido";
import { LoginContext } from "../../contexts/LoginContext";
import Pedido from "../../models/pedido/Pedido";
import { buscarPedidosPorStatusOuMesa, buscarPedidosPorRestaurante } from "../../services/Service";
import toastAlert from "../../utils/toastAlert";
import { useNavigate } from "react-router-dom";

function PedidoPage() {
    const navigate = useNavigate(); 
    
    const { login, handleLogout } = useContext(LoginContext);

    const [pedidos, setPedidos] = useState<Array<Pedido>>([]);

    async function getPedidos() {
        switch(login.perfil) {
            case "COZINHA":
                await buscarPedidosPorStatusOuMesa(`/pedido/listar/status`, setPedidos, {
                    data: {
                        id: login.restauranteId,
                        status: "R",
                    },
                    header: {
                        Authorization: login.token,
                    }
                });
                break;

            case "GARCOM":
                await buscarPedidosPorStatusOuMesa(`/pedido/listar/status`, setPedidos, {
                    data: {
                        id: login.restauranteId,
                        status: "F",
                    },
                    header: {
                        Authorization: login.token,
                    }
                });
                break;

            case "CAIXA":
                await buscarPedidosPorRestaurante(`/pedido/listar/data/corrente/restaurante/${login.restauranteId}`, setPedidos, {
                    header: {
                        Authorization: login.token,
                    }
                });
                break;

            case "ADMIN":
                await buscarPedidosPorRestaurante(`/pedido/listar/restaurante/${login.restauranteId}`, setPedidos, {
                    header: {
                        Authorization: login.token,
                    }
                });
                break;
            
            default: break;
        }
    }

    useEffect(() => {
        getPedidos;
    }, [])

    useEffect(() => {
		if (login.token === '') {
			toastAlert('Você precisa logar novamente', 'info');
			navigate('/');
		}
	}, [login.token]);

    return (
        <div className="bg-[#F8F8F8] w-full h-full flex flex-col gap-4 items-center px-4 pb-4 my-2 max-[768px]:px-2 max-[768px]:pb-2">
            { login.perfil === "COZINHA" ? <></> :   
                <h1 className="text-[#D42300] subCategoriaTitle text-3xl font-bold mt-4 max-[1600px]:mt-4">
                    { login.perfil === "GARCOM" ? "Pedidos prontos" : "Histórico de pedidos" } 
                </h1>
            } 
        
            <div className={login.perfil === "COZINHA" ? "bg-[#F8F8F8] w-full h-4/6 max-[1600px]:h-5/6 flex flex-col justify-center items-center"
                : "bg-[#F8F8F8] w-full h-full max-h-[70%] flex flex-col justify-center items-center"}>
                <ListaPedido pedidos={pedidos}/>
            </div>
        </div>
    )
}

export default PedidoPage;