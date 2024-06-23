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

function ListaMesa(props: { mesas: Array<Mesa>; getMesas: Function }) {

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
            <li key={mesa.id} onClick={() => { login.perfil == "GARCOM" ? atender(mesa.id) : getPedidosByMesa(mesa.id)}} className="flex justify-center items-center h-24 w-full">
                <CardMesa mesa={mesa} isLoading={isLoading} />
            </li>
        ));
    }

    return (
        <>
            <ul className="grid grid-cols-7 w-full py-2 max-[690px]:p-2 max-[400px]:grid-cols-2 max-[600px]:grid-cols-3 max-[850px]:grid-cols-5 max-[920px]:grid-cols-6">
                { renderMesas() }
            </ul>
            
            <ModalPedidoMesa pedidos={pedidos} isOpen={isOpen} setIsOpen={setIsOpen} isLoading={isLoading} />
        </>
    );
}

export default ListaMesa;