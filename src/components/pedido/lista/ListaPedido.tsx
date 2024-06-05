import { useContext, useState } from "react";
import { LoginContext } from "../../../contexts/LoginContext";
import CardPedido from "../card/CardPedido";
import Pedido from "../../../models/Pedido";

function ListaPedido() {
    const { usuario } = useContext(LoginContext);

    const [pedidos, setPedidos] = useState<Array<Pedido>>([
        {
            id: 1,
            mesa: {
                id: 1,
                numero: 4,
                chamarGarcom: true
            },
            item: [],
            data: "11/02/2024",
            status: "REALIZADO",
        },
    ]);
    const [total, setTotal] = useState<number>(0);
    const [quantidade, setQuantidade] = useState<number>(0);

    const [isLoading, setIsLoading] = useState<boolean>(false);

    function renderItens() {
        return pedidos?.map((pedido: Pedido) => (
            <tr key={pedido.id} className="flex">
                <CardPedido pedido={pedido} />
            </tr>
        ));
    }

    // Criar busca de pedidos no banco por perfis de usuario + useEffect + condicional no return 

    // Cozinha: get pedidos "REALIZADOS"
    // Garçom: get pedidos "PRONTOS"
    // Caixa: get all pedidos do dia
    // Gerente/superior: get all pedidos

    // Apenas Cozinha terá visualização dos pedidos por botões

    return (

        // Usuario.perfil === CAIXA ou superior
        <div className="flex flex-col mt-10 mx-auto max-w-[60%] max-h-[75%] h-full relative overflow-hidden shadow-md rounded-lg">
            <table className="table-auto flex flex-col w-full h-full text-sm text-left rtl:text-right">
                <thead className="h-10 text-xs text-gray-200 uppercase bg-gray-700">
                    <tr className="flex justify-between text-center w-full">
                        <th scope="col" className="w-full px-6 py-3">
                            Código Pedido
                        </th>
                        <th scope="col" className="w-full px-6 py-3">
                            Mesa
                        </th>
                        <th scope="col" className="w-full px-6 py-3">
                            Data
                        </th>
                        <th scope="col" className="w-full px-6 py-3">
                            Status
                        </th>
                        <th scope="col" className="w-full px-6 py-3">
                            Ação
                        </th>
                    </tr>
                </thead>
                <tbody className="flex flex-col overflow-auto w-full max-h-content h-[85%] mt-4 text-gray-700">
                    {isLoading ? <></> : renderItens()}
                </tbody>
                { (usuario.perfil === "CAIXA" || usuario.perfil === "GERENTE" || usuario.perfil === "ADMIN") &&
                    <tfoot className="flex flex-1 items-center w-full max-h-[25%] h-12">
                        <tr className="flex items-center justify-end px-6 w-full h-full font-semibold text-gray-900">
                            <th scope="row" className="flex justify-center items-center text-base w-16">Total</th>
                            <td className="flex justify-center items-center text-center w-16">Qtd {quantidade}</td>
                            <td className="flex justify-center items-center text-center w-28">R$ {total.toFixed(2)}</td>
                        </tr>
                    </tfoot>
                }
            </table>
        </div>
    )
}

export default ListaPedido;