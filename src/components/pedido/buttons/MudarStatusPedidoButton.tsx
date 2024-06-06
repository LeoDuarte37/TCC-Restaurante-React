import { useContext } from "react";
import { LoginContext } from "../../../contexts/LoginContext";

function MudarStatusPedidoButton(props: { pedidoId: number }) {

    const { usuario } = useContext(LoginContext);

    function mudarStatusPedido() {
        if (usuario.perfil === "COZINHA") {

        } else if (usuario.perfil === "GARCOM") {
            
        }
    }

    return (
        <button onClick={mudarStatusPedido} className="button">
            { usuario.perfil === "COZINHA" ? "Pedido pronto" : "Pedido entregue"}
        </button>
    )
}

export default MudarStatusPedidoButton;