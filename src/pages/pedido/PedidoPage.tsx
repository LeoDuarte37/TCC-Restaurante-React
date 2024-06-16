import { useContext, useState } from "react";
import ListaPedido from "../../components/pedido/lista/ListaPedido";
import { LoginContext } from "../../contexts/LoginContext";
import Pedido from "../../models/pedido/Pedido";

function PedidoPage() {

    const { login, handleLogout } = useContext(LoginContext);

    const [pedidos, setPedidos] = useState<Array<Pedido>>([]);

    function getPedidos() {
        if (login.perfil === "COZINHA") {

        } else if (login.perfil === "GARCOM") {

        } else if (login.perfil === "CAIXA") {

        } else if (login.perfil === "GERENTE") {

        } else if (login.perfil === "ADMIN") {

        }
    }

    // Criar useEffect para buscar no banco de tempo em tempo



    return (
        <div className="bg-[#F8F8F8] w-full h-full flex flex-col gap-4 items-center px-4 pb-4 my-2 max-[768px]:px-2 max-[768px]:pb-2">
            { login.perfil === "COZINHA" ? <></> :   
                <h1 className="text-[#D42300] subCategoriaTitle text-3xl font-bold mt-4 max-[1600px]:mt-4">
                    { login.perfil === "GARCOM" ? "Pedidos prontos" : "Histórico de pedidos" } 
                </h1>
            } 
        
            <div className={login.perfil === "COZINHA" ? "bg-[#F8F8F8] w-full h-4/6 max-[1600px]:h-5/6 flex flex-col justify-center items-center"
                : "bg-[#F8F8F8] w-full h-full max-h-[70%] flex flex-col justify-center items-center"}>
                <ListaPedido />
            </div>
        </div>
    )
}

export default PedidoPage;