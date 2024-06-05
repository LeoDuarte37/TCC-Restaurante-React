import Pedido from "../../../models/Pedido";

function CardPedido(props: { pedido: Pedido }) {
    
    return (
        <>
            <th scope="row" className="flex justify-center items-center w-full font-medium whitespace-nowrap">
                { props.pedido.id }
            </th>
            <td className="flex justify-center items-center w-full font-medium whitespace-nowrap">
                { props.pedido.mesa.numero }
            </td>
            <td className="flex justify-center items-center w-full font-medium whitespace-nowrap">
                { props.pedido.data }
            </td>
            <td className="flex justify-center items-center w-full font-medium whitespace-nowrap">
                { props.pedido.status }
            </td>
        </>          
    );
}

export default CardPedido;