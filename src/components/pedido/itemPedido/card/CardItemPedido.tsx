import Item from "../../../../models/Item";

function CardItemPedido(props: { item: Item }) {

    return (
        <> 
            <th scope="row" className="flex justify-center items-center w-full h-12 p-0 font-medium whitespace-nowrap">
                {props.item.produto.nome}
            </th>
            <td className="flex justify-center items-center w-full h-12 p-0">
                {props.item.quantidade}
            </td>
            <td className="flex justify-center items-center w-full h-12 p-0">
                R$ {props.item.produto.valor}
            </td>
            <td className="flex justify-center items-center w-full h-12 p-0">
                {props.item.observacao}
            </td>
        </>
    );
}

export default CardItemPedido;