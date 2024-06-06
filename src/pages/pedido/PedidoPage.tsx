import { useContext, useState } from "react";
import ListaPedido from "../../components/pedido/lista/ListaPedido";
import { LoginContext } from "../../contexts/LoginContext";
import Pedido from "../../models/Pedido";

function PedidoPage() {

    const { usuario, handleLogout } = useContext(LoginContext); 

    const [ pedidos, setPedidos ] = useState<Array<Pedido>>([]);

    function getPedidos() {
        if (usuario.perfil === "COZINHA") {

        } else if (usuario.perfil === "GARCOM") {

        } else if (usuario.perfil === "CAIXA") {

        } else if (usuario.perfil === "GERENTE") {

        } else if (usuario.perfil === "ADMIN") {
            
        }
    }

    // Criar useEffect para buscar no banco de tempo em tempo



    return (
        <ListaPedido />
    )
}

export default PedidoPage;