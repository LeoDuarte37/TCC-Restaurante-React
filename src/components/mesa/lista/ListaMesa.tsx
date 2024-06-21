import { useContext, useEffect, useState } from "react";
import Mesa from "../../../models/mesa/Mesa";
import ListarPedidosPorMesaAndStatus from "../../../models/pedido/ListarPedidosPorMesaAndStatus";
import { buscarPedidosPorStatusOuMesa } from "../../../services/Service";
import toastAlert from "../../../utils/toastAlert";
import CardMesa from "../card/CardMesa";
import { useNavigate } from "react-router-dom";
import { LoginContext } from "../../../contexts/LoginContext";
import useMesa from "../../../hooks/useMesa";
import Pedido from "../../../models/pedido/Pedido";
import ModalPedidoMesa from "../modal/ModalPedidoMesa";

function ListaMesa(props: { mesas: Array<Mesa>; getMesas: Function}) {

    const { login, handleLogout } = useContext(LoginContext);
    const { atenderMesa } = useMesa();

    const navigate = useNavigate();

    const [pedidos, setPedidos] = useState<Array<Pedido>>([]);

    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [isOpen, setIsOpen] = useState<boolean>(false);

    async function getPedidosByMesa(mesaId: number) {
        try {
            setIsLoading(true);

            const listarPedidosPorMesaAndStatus: ListarPedidosPorMesaAndStatus = {
                mesa: mesaId,
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

    function atender(mesaId: number) {
        atenderMesa(mesaId);
        props.getMesas();
    }

    useEffect(() => {
        getPedidosByMesa;
    }, [pedidos])

    function renderMesas() {
        return props.mesas.map((mesa) => (
            <> {login.perfil === "GARCOM" ?
                    <li key={mesa.id} onClick={() => atender(mesa.id)} >
                        <CardMesa mesa={mesa} isLoading={isLoading} />
                    </li>

                    : <li key={mesa.id} onClick={() => getPedidosByMesa(mesa.id)} >
                        <CardMesa mesa={mesa} isLoading={isLoading} />
                    </li>
                }
            </>
        ));
    }

    return (
        <>
            <ul className="flex w-full h-full m-4 p-4 max-[690px]:p-2 border-2 border-[#3B1206] rounded-lg">
                { renderMesas() }
            </ul>

            
            <ModalPedidoMesa pedidos={pedidos} isOpen={isOpen} setIsOpen={setIsOpen} isLoading={isLoading} />
        </>
    );
}

export default ListaMesa;