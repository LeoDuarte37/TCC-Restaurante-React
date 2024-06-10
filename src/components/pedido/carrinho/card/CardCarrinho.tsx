import { useEffect, useState } from "react";
import usePedido from "../../../../hooks/usePedido";
import Item from "../../../../models/Item";

function CardCarrinho(props: { item: Item, getSubTotal: Function }) {

    const { updateQuantidade } = usePedido();

    const [quantidade, setQuantidade] = useState<number>(props.item.quantidade);

    useEffect(() => {
        updateQuantidade(props.item.produto.id, quantidade);
        props.getSubTotal();
    }, [quantidade])

    return (
        <>
            {quantidade > 0 &&
                <div className="flex border border-[#F5EBDC] rounded-md">
                    <div className="h-content w-24 flex-shrink-0 overflow-hidden rounded-md rounded-r-none">
                        <img
                            src={props.item.produto.foto}
                            alt="Foto produto"
                            className="h-full w-full object-cover object-center"
                        />
                    </div>

                    <div className="flex flex-1 flex-col p-2">
                        <div>
                            <div className="flex justify-between text-base font-bold text-[#3B1206]">
                                <h3>
                                    {props.item.produto.nome}
                                </h3>

                                <p className="ml-4">R${props.item.produto.valor}</p>
                            </div>
                        </div>
                        <div className="flex flex-1 items-center justify-between text-sm mt-4 text-[#D42300]">
                            <div className="flex items-center justify-center">
                                <button onClick={() => setQuantidade(quantidade - 1)} type="button" className="px-2 text-sm font-medium focus:outline-none bg-white rounded-lg border border-[#F5EBDC] hover:bg-white-100 hover:text-[#b51f02] focus:z-10 focus:ring-1 focus:ring-[#b51f02]">
                                    -
                                </button>

                                <p className="px-2">{quantidade}</p>

                                <button onClick={() => setQuantidade(quantidade + 1)} type="button" className="px-2 text-sm font-medium focus:outline-none bg-white rounded-lg border border-[#F5EBDC] hover:bg-white-100 hover:text-[#b51f02] focus:z-10 focus:ring-1 focus:ring-[#b51f02]">
                                    +
                                </button>
                            </div>

                            <div className="flex">
                                <button
                                    type="button"
                                    className="text-base font-medium text-[#D42300] hover:text-[#b51f02]"
                                >
                                    Adicionar observação
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            };
        </>
    );
}

export default CardCarrinho;