import { useContext } from "react";
import Pedido from "../../../models/Pedido";
import { LoginContext } from "../../../contexts/LoginContext";

function CardPedido(props: { pedido: Pedido }) {

    const { usuario } = useContext(LoginContext);
    
    return (
        <>
            <th scope="row" className="flex justify-center items-center w-full whitespace-nowrap">
                { props.pedido.id }
            </th>
            <td className="flex justify-center items-center w-full whitespace-nowrap">
                { props.pedido.mesa.numero }
            </td>
            <td className="flex justify-center items-center w-full whitespace-nowrap">
                { props.pedido.data }
            </td>
            { usuario.perfil === "GARCOM" ? <></> :
                <td className="flex justify-center items-center w-full whitespace-nowrap">
                    { props.pedido.status }
                </td>
            }
        </>          
    );
}

export default CardPedido;