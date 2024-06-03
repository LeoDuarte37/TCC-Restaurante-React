import { useContext, useEffect, useState } from "react";
import Item from "../../../../models/Item";
import { LoginContext } from "../../../../contexts/LoginContext";
import CardItemPedido from "../card/CardItemPedido";

function ListaItemPedido(props: { item: Array<Item> }) {

    const { usuario, isMesa } = useContext(LoginContext);

    const [itens, setItens] = useState<Array<Item>>(props.item);
    const [total, setTotal] = useState<number>(0);
    const [quantidade, setQuantidade] = useState<number>(0);

    const [isLoading, setIsLoading] = useState<boolean>(false);

    function getInfo() {
        itens.map((item: Item) => {
            setTotal(total + item.produto.valor * item.quantidade);
            setQuantidade(quantidade + item.quantidade);
        });
    }

    function renderItens() {
        return itens?.map((item: Item) => (
            <tr key={item.produto.id} className="flex bg-white dark:bg-gray-800">
                <CardItemPedido item={item} />
            </tr>
        ));
    }

    useEffect(() => {
        setItens(props.item);
        getInfo();
    }, [props.item || total || quantidade]);

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
                <tbody className="overflow-auto w-full max-h-60 h-full">
                    {isLoading ? <></> : renderItens()}
                </tbody>
                { (usuario.perfil === "CAIXA" || usuario.perfil === "GERENTE" || usuario.perfil === "ADMIN" || isMesa === true) &&
                    <tfoot className="flex">
                        <tr className="flex items-center w-full h-12 font-semibold text-gray-900">
                            <th scope="row" className="px-6 text-base w-[40%]">Total</th>
                            <td className="px-6 text-center w-[20%]">{quantidade}</td>
                            <td className="px-6 text-center w-[40%]">R$ {total}</td>
                        </tr>
                    </tfoot>
                }
            </table>
        </div>
    );
}

export default ListaItemPedido;