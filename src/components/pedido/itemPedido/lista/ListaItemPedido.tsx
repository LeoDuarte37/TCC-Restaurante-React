import { useContext, useEffect, useState } from "react";
import Item from "../../../../models/Item";
import { LoginContext } from "../../../../contexts/LoginContext";
import CardItemPedido from "../card/CardItemPedido";
import usePedido from "../../../../hooks/usePedido";

function ListaItemPedido(props: { item: Array<Item> }) {

    const { usuario, isMesa } = useContext(LoginContext);

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
        return itens?.map((item: Item) => (
            <tr key={item.produto.id} className="flex bg-white dark:bg-gray-800">
                <CardItemPedido item={item} />
            </tr>
        ));
    }

    useEffect(() => {
        getInfo();
    }, [props.item]);

    return (
        <div className="flex flex-col max-h-80 h-full relative overflow-hidden shadow-md rounded-lg">
            <table className="flex flex-col w-full h-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                <thead className="h-10 text-xs text-gray-700 uppercase bg-gray-100 dark:bg-gray-700 dark:text-gray-400">
                    <tr>
                        <th scope="col" className="px-6 py-3">
                            Nome produto
                        </th>
                        <th scope="col" className="px-6 py-3">
                            Qtd
                        </th>
                        <th scope="col" className="px-6 py-3">
                            Valor unitário
                        </th>
                        {/* <th scope="col" className="px-6 py-3">
                            Observação
                        </th> */}
                    </tr>
                </thead>
                <tbody className="flex flex-col overflow-auto w-full max-h-content h-[75%]">
                    {isLoading ? <></> : renderItens()}
                </tbody>
                { (usuario.perfil === "CAIXA" || usuario.perfil === "GERENTE" || usuario.perfil === "ADMIN" || isMesa === true) &&
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
    );
}

export default ListaItemPedido;