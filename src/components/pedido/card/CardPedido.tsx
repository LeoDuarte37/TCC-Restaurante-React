import { useEffect, useState } from "react";
import usePedido from "../../../hooks/usePedido";
import Item from "../../../models/Item";

function CardPedido(props: { item: Item, page: string, getSubTotal: Function }) {

    const { updateQuantidade } = usePedido();

    const [quantidade, setQuantidade] = useState<number>(props.item.quantidade);

    useEffect(() => {
        updateQuantidade(props.item.produto.id, quantidade);
        props.getSubTotal();
    }, [quantidade])

    return (
        <>
            {props.page === "Pedidos" ?
                <>
                    {quantidade > 0 &&
                        <div className="flex">
                            <div className="h-content w-24 flex-shrink-0 overflow-hidden rounded-md border border-gray-200">
                                <img
                                    src={props.item.produto.foto}
                                    alt="Foto produto"
                                    className="h-full w-full object-cover object-center"
                                />
                            </div>

                            <div className="ml-4 flex flex-1 flex-col">
                                <div>
                                    <div className="flex justify-between text-base font-medium text-gray-900">
                                        <h3>
                                            {props.item.produto.nome}
                                        </h3>

                                        <p className="ml-4">R${props.item.produto.valor}</p>
                                    </div>
                                </div>
                                <div className="flex flex-1 items-center justify-between text-sm mt-4">
                                    <div className="flex items-center justify-center">
                                        <button onClick={() => setQuantidade(quantidade - 1)} type="button" className="px-2 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-100 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700">
                                            -
                                        </button>

                                        <p className="text-gray-500 px-2">{quantidade}</p>

                                        <button onClick={() => setQuantidade(quantidade + 1)} type="button" className="px-2 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-100 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700">
                                            +
                                        </button>
                                    </div>

                                    <div className="flex">
                                        <button
                                            type="button"
                                            className="font-medium text-indigo-600 hover:text-indigo-500"
                                        >
                                            Adicionar observação
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    };
                </>

                : <>
                    { props.page === "ContaMesa" &&
                        <>
                            <th scope="row" className="w-[40%] px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                {props.item.produto.nome}
                            </th>
                            <td className="px-6 py-4 text-center w-[20%]">
                                {props.item.quantidade}
                            </td>
                            <td className="px-6 py-4 text-center w-[40%]">
                                R$ {props.item.produto.valor}
                            </td>
                        </>                   
                    }
                </>
            }
        </>
    );
}

export default CardPedido;