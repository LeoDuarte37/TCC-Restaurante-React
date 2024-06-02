import { useEffect, useState, useContext } from "react";
import Mesa from "../../../models/Mesa";
import CardMesa from "../card/CardMesa";
import useMesa from "../../../hooks/useMesa";
import Pedido from "../../../models/Pedido";
import { LoginContext } from "../../../contexts/LoginContext";
import { buscarPedidos } from "../../../services/Service";

function ListaMesa() {

    const { usuario } = useContext(LoginContext);

    const { isModified } = useMesa();
    const [mesas, setMesas] = useState<Array<Mesa>>([]);
    const [pedidos, setPedidos] = useState<Array<Pedido>>([]);

    const [isLoading, setIsLoading] = useState<boolean>(false);

    function getMesas() {
        setIsLoading(true);

        if (usuario.perfil === "GARCOM") {
            const search = JSON.parse(localStorage.getItem("mesa") || "[]");
            setMesas(search);
        } else if (usuario.perfil === "COZINHA") {
            buscarPedidos("/pedido", setPedidos, { 
                headers: { 
                    Authorization: usuario.token, 
                },
            });
        }

        setIsLoading(false);
    }

    function renderMesas() {
        if (usuario.perfil === "GARCOM") {
            return mesas.map((mesa) => (
                <li key={mesa.id}>
                    <CardMesa mesa={mesa} />
                </li>
            ));
        } else if (usuario.perfil === "COZINHA") {
            return pedidos.map((pedido) => (
                <li key={pedido.id}>
                    <CardMesa pedido={pedido} />
                </li>
            ));
        }

    }

    useEffect(() => {
        getMesas();
    }, [isModified]);

    return (
        <ul>
            { isLoading ? <></> : renderMesas() }
        </ul>
    );
}

export default ListaMesa;