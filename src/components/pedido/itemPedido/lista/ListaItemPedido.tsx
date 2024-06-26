import { useContext, useEffect, useState } from "react";
import Item from "../../../../models/pedido/item/Item";
import { LoginContext } from "../../../../contexts/LoginContext";
import CardItemPedido from "../card/CardItemPedido";
import usePedido from "../../../../hooks/usePedido";
import MudarStatusPedidoButton from "../../buttons/MudarStatusPedidoButton";
import Pedido from "../../../../models/pedido/Pedido";
import { RotatingLines } from "react-loader-spinner";

function ListaItemPedido(props: { item: Array<Item>; pedido?: Pedido }) {

    const { login } = useContext(LoginContext);

    const { getInfoConta } = usePedido();

    const [itens, setItens] = useState<Array<Item>>([]);
    const [total, setTotal] = useState<number>(0);
    const [quantidade, setQuantidade] = useState<number>(0);

    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [isOpen, setIsOpen] = useState<boolean>(false);

    async function getInfo() {
        setItens(props.item);

        const [valor, qtd] = await getInfoConta(props.item);
        setTotal(valor);
        setQuantidade(qtd);
    }

    function renderItens() {
        return itens.map((item: Item) => (
            <tr key={props.pedido?.id} className="flex text-[#3B1206] text-base max-[690px]:text-sm">
                <CardItemPedido item={item} />
            </tr>
        ));
    }

    useEffect(() => {
        setIsLoading(true);
        getInfo();
        setIsLoading(false);
    }, [props.item]);

    return (
        <>
            <table className="flex flex-col w-full h-full text-left rtl:text-right">
                <thead className="h-12 text-base text-[#F8F8F8] uppercase bg-[#3B1206] max-[690px]:text-sm">
                    <tr className="h-full flex items-center justify-between text-center w-full">
                        <th scope="col" className="w-full h-full flex justify-center items-center p-0">
                            <p className="max-[425px]:w-14">
                                Produto
                            </p>
                        </th>
                        <th scope="col" className="w-full h-full flex justify-center items-center p-0">
                            <p>
                                Qtd
                            </p>
                        </th>
                        {(login.perfil === "COZINHA" || login.perfil === "GARCOM") ? <></> :
                            <th scope="col" className="w-full h-full flex justify-center items-center p-0">
                                <p>
                                    Valor uni.
                                </p>
                            </th>
                        }
                        <th scope="col" className="w-full h-full flex justify-center items-center p-0">
                            <p>
                                Observação
                            </p>
                        </th>
                    </tr>
                </thead>
                <tbody className="flex flex-col bg-[#F8F8F8] overflow-auto w-full max-h-content h-[70%]">
                    {isLoading ? <RotatingLines
                        strokeColor="white"
                        strokeWidth="5"
                        animationDuration="0.75"
                        width="24"
                        visible={true}
                    /> : renderItens()}
                </tbody>
                <tfoot className="bg-[#F8F8F8] border-t-2 border-[#F5EBDC] flex flex-1 items-center w-full max-h-full h-full pt-2 pb-4">
                    <tr className="flex items-center w-full h-full font-bold text-[#3B1206] text-base max-[690px]:text-sm">
                        {(login.perfil === "COZINHA" || login.perfil === "GARCOM")
                            ? <th scope="row" className="flex justify-center w-full h-full">
                                <MudarStatusPedidoButton pedidoId={props.pedido?.id || 0} />
                            </th>
                            : <>
                                <th scope="row" className="flex justify-center items-center w-full">
                                    Total
                                </th>
                                <td className="flex justify-center items-center text-center w-full">
                                    {quantidade}
                                </td>
                                <td className="flex justify-center items-center text-center w-full">
                                    R$ {total.toFixed(2)}
                                </td>
                                {(login.perfil === "COZINHA" || login.perfil === "GARCOM") ? <></> :
                                    <td className="w-full"></td>
                                }
                            </>
                        }
                    </tr>
                </tfoot>
            </table>
        </>
    );
}

export default ListaItemPedido;