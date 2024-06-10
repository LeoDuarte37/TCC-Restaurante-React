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
        <div className="bg-[#F8F8F8] w-full h-full flex flex-col gap-6 items-center px-4 pb-4 max-w[768px]:px-2 max-w[768px]:pb-2">
            { usuario.perfil === "COZINHA" ? <></> :  
                <h1 className="text-[#D42300] subCategoriaTitle text-3xl font-bold mt-6 max-[1600px]:mt-4">
                    {usuario.perfil === "GARCOM" ? "Pedidos prontos" : "Histórico de pedidos" }
                </h1>
            }
        
            <div className={usuario.perfil === "COZINHA" ? "bg-[#F8F8F8] w-full h-4/6 max-[1600px]:h-5/6 flex flex-col justify-center items-center"
                : "bg-[#F8F8F8] w-full h-3/4 max-[1600px]:h-[72%] flex flex-col justify-center items-center"}>
                <ListaPedido />
            </div>
        </div>
    )
}

export default PedidoPage;