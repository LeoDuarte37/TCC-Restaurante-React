import usePedido from "../../../hooks/usePedido";
import Item from "../../../models/Item";
import Produto from "../../../models/Produto";
import toastAlert from "../../../utils/toastAlert";

function CardProduto(props: { produto: Produto; isMesa?: boolean }) {

    const { addToPedido } = usePedido();

    function handleClickAddToPedido(produto: Produto) {
        const item: Item = {
            produto: produto,
            quantidade: 1,
        };

        try {
            addToPedido(item);
            toastAlert("Item adicionado!", "sucesso");
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <div className="relative flex flex-row bg-clip-border rounded-xl bg-[#F8F8F8] border-2 border-[#F5EBDC] shadow-inner w-full h-36">
            <div
                className="relative max-w-40 m-0 overflow-hidden bg-white rounded-r-none bg-clip-border rounded-xl shrink-0">
                <img
                    src={props.produto.foto}
                    alt="card-image" className="object-cover w-full h-full" />
            </div>
            <div className="px-3 py-2 w-full h-full flex flex-col justify-between gap-2">
                <div className="flex justify-between w-full">
                    <h4 className="block font-sans text-lg antialiased font-bold leading-snug tracking-normal text-[#3B1206]">
                        {props.produto.nome}
                    </h4>

                    <p className="text-[#3B1206]">
                    <span className="font-bold">R$ {props.produto.valor}</span>
                    </p>
                </div>
                <p className="block h-full overflow-hidden text-base leading-5 antialiased font-normal text-justify text-[#3B1206]">
                    {props.produto.descricao}
                </p>

                <div className="flex justify-end items-end h-8">
                    <button onClick={() => handleClickAddToPedido(props.produto)} className="bg-[#D42300] hover:bg-blue-700 text-white font-semibold py-1 px-2 rounded h-8">
                        Adicionar
                    </button>
                </div>
            </div>
        </div>
    )
}

export default CardProduto;