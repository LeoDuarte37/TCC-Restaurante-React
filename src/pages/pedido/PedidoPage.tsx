import { useContext, useState } from "react";
import ListaPedido from "../../components/pedido/lista/ListaPedido";
import { LoginContext } from "../../contexts/LoginContext";
import Pedido from "../../models/Pedido";

function PedidoPage() {

    const { usuario, handleLogout } = useContext(LoginContext);

    const [pedidos, setPedidos] = useState<Array<Pedido>>([]);

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
        <div className="w-full h-full flex flex-col justify-center items-center px-2 pb-2">
            {usuario.perfil === "GARCOM" &&
                <h1 className="text-gray-600 text-2xl font-bold my-6">
                    Pedidos prontos
                </h1>
            }
            <ListaPedido />
        </div>
    )
}

export default PedidoPage;