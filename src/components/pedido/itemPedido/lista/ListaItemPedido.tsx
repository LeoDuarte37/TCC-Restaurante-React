import { useContext, useEffect, useState } from "react";
import Item from "../../../../models/Item";
import { LoginContext } from "../../../../contexts/LoginContext";
import CardItemPedido from "../card/CardItemPedido";
import usePedido from "../../../../hooks/usePedido";
import MudarStatusPedidoButton from "../../buttons/MudarStatusPedidoButton";

function ListaItemPedido(props: { item: Array<Item>; pedidoId?: number }) {

    const { usuario } = useContext(LoginContext);

    const { getInfoConta } = usePedido();

    const [itens, setItens] = useState<Array<Item>>([]);
    const [total, setTotal] = useState<number>(0);
    const [quantidade, setQuantidade] = useState<number>(0);

    const [isLoading, setIsLoading] = useState<boolean>(false);

    async function getInfo() {
        setIsLoading(true);
        setItens(props.item);

        const [valor, qtd] = await getInfoConta(props.item);
        setTotal(valor);
        setQuantidade(qtd);

        setIsLoading(false);
    }

    function renderItens() {
        return itens.map((item: Item) => (
            <tr key={item.produto.id} className="flex text-white">
                <CardItemPedido item={item} />
            </tr>
        ));
    }

    useEffect(() => {
        getInfo();
    }, [props.item]);

    return (
        <table className="flex flex-col w-full h-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
            <thead className="h-12 text-xs text-gray-700 uppercase bg-gray-100 dark:bg-gray-700 dark:text-gray-400">
                <tr className="h-full flex items-center justify-between text-center w-full">
                    <th scope="col" className="w-full h-full flex justify-center items-center p-0">
                        Nome produto
                    </th>
                    <th scope="col" className="w-full h-full flex justify-center items-center p-0">
                        Qtd
                    </th>
                    { (usuario.perfil === "COZINHA" || usuario.perfil === "GARCOM") ? <></> : 
                        <th scope="col" className="w-full h-full flex justify-center items-center p-0">
                            Valor unitário
                        </th>
                    }
                    <th scope="col" className="w-full h-full flex justify-center items-center p-0">
                        Observação
                    </th>
                </tr>
            </thead>
            <tbody className="flex flex-col bg-gray-800 overflow-auto w-full max-h-content h-[70%]">
                {isLoading ? <></> : renderItens()}
            </tbody>
            <tfoot className="flex flex-1 items-center w-full max-h-full h-full py-4">
                <tr className="flex items-center w-full h-full font-semibold text-gray-900">
                    {(usuario.perfil === "COZINHA" || usuario.perfil === "GARCOM") 
                        ? <th scope="row" className="flex justify-center w-full">
                            <MudarStatusPedidoButton pedidoId={props.pedidoId || 0} /> 
                        </th>
                        : <>
                            <th scope="row" className="flex justify-center items-center text-base w-full">
                                Total
                            </th>
                            <td className="flex justify-center items-center text-center w-full">
                                {quantidade}
                            </td>
                            <td className="flex justify-center items-center text-center w-full">
                                R$ {total.toFixed(2)}
                            </td>
                            { (usuario.perfil === "COZINHA" || usuario.perfil === "GARCOM") ? <></> : 
                                <td className="w-full"></td>
                            }
                        </>
                    }
                </tr>
            </tfoot>
        </table>
    );
}

export default ListaItemPedido;