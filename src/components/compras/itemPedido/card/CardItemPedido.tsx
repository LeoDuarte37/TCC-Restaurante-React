import Item from "../../../../models/Item";

function CardItemPedido(props: { item: Item }) {

    return (
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
    );
}

export default CardItemPedido;