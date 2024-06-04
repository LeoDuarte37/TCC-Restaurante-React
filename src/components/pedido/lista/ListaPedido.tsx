import { useContext, useState } from "react";
import { LoginContext } from "../../../contexts/LoginContext";
import CardPedido from "../card/CardPedido";
import Pedido from "../../../models/Pedido";


function ListaPedido() {
    const { usuario } = useContext(LoginContext);

    const [pedidos, setPedidos] = useState<Array<Pedido>>([]);
    const [total, setTotal] = useState<number>(0);
    const [quantidade, setQuantidade] = useState<number>(0);

    const [isLoading, setIsLoading] = useState<boolean>(false);

    function renderItens() {
        return pedidos?.map((pedido: Pedido) => (
            <tr key={pedido.id} className="flex bg-white dark:bg-gray-800">
                <CardPedido pedido={pedido} />
            </tr>
        ));
    }

    return (

        // Usuario.perfil === CAIXA ou superior
        <div className="flex flex-col mt-6 mx-auto max-w-[60%] max-h-[75%] h-full relative overflow-hidden shadow-md rounded-lg">
            <table className="flex flex-col w-full h-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                <thead className="h-10 text-xs text-gray-700 uppercase bg-gray-100 dark:bg-gray-700 dark:text-gray-400">
                    <tr className="flex justify-between text-center w-full">
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
                <tbody className="flex flex-col overflow-auto w-full max-h-content h-[75%]">
                    {isLoading ? <></> : renderItens()}
                </tbody>
                { (usuario.perfil === "CAIXA" || usuario.perfil === "GERENTE" || usuario.perfil === "ADMIN") &&
                    <tfoot className="flex max-h-[25%] h-[25%]">
                        <tr className="flex items-center w-full h-full font-semibold text-gray-900">
                            <th scope="row" className="px-6 text-base w-[40%]">Total</th>
                            <td className="px-6 text-center w-[20%]">{quantidade}</td>
                            <td className="px-6 text-center w-[40%]">R$ {total.toFixed(2)}</td>
                        </tr>
                    </tfoot>
                }
            </table>
        </div>
    )
}

export default ListaPedido;