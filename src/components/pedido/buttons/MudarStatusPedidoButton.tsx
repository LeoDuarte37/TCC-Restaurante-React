import { useContext, useState } from "react";
import { LoginContext } from "../../../contexts/LoginContext";
import { editarStatusPedido } from "../../../services/Service";
import Status from "../../../models/Status";
import Pedido from "../../../models/pedido/Pedido";
import toastAlert from "../../../utils/toastAlert";

function MudarStatusPedidoButton(props: { pedidoId: number }) {

    const { login } = useContext(LoginContext);

    const [pedido, setPedido] = useState<Pedido>();

    async function mudarStatusPedido() {
        if (login.perfil === "COZINHA") {
            const atualizarPedidoCozinha: Status = {
                id: props.pedidoId,
                status: "F",
            }

            try {
                await editarStatusPedido(atualizarPedidoCozinha, setPedido, {
                    headers: {
                        Authorization: `Bearer ${login.token}`
                    }
                })

                toastAlert("Pedido Feito!", "sucesso");
            } catch (error) {
                toastAlert("Erro ao enviar pedido! Tente novamente.", "erro");
            }

        } else if (login.perfil === "GARCOM") {
            const atualizarPedidoGarcom: Status = {
                id: props.pedidoId,
                status: "E",
            }

            try {
                await editarStatusPedido(atualizarPedidoGarcom, setPedido, {
                    headers: {
                        Authorization: `Bearer ${login.token}`
                    }
                })

                toastAlert("Pedido Entregue!", "sucesso");
            } catch (error) {
                toastAlert("Erro ao entregar pedido! Tente novamente.", "erro");
            }
        }
    }

    return (
        <button onClick={mudarStatusPedido} className="button">
            { login.perfil === "COZINHA" ? "Pedido pronto" : "Pedido entregue"}
        </button>
    )
}

export default MudarStatusPedidoButton;