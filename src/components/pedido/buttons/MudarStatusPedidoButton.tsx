import { useContext } from "react";
import { LoginContext } from "../../../contexts/LoginContext";

function MudarStatusPedidoButton(props: { pedidoId: number }) {

    const { login } = useContext(LoginContext);

    function mudarStatusPedido() {
        if (login.perfil === "COZINHA") {

        } else if (login.perfil === "GARCOM") {
            
        }
    }

    return (
        <button onClick={mudarStatusPedido} className="button">
            { login.perfil === "COZINHA" ? "Pedido pronto" : "Pedido entregue"}
        </button>
    )
}

export default MudarStatusPedidoButton;