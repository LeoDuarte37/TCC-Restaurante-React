import { useContext } from "react";
import Pedido from "../../../models/pedido/Pedido";
import { LoginContext } from "../../../contexts/LoginContext";

function CardPedido(props: { pedido: Pedido }) {

    const { login } = useContext(LoginContext);

    const hora: string = props.pedido.data.slice(11);
    
    return (
        <>
            <th scope="row" className="flex justify-center items-center w-full whitespace-nowrap">
                { props.pedido.id }
            </th>
            <td className="flex justify-center items-center w-full whitespace-nowrap">
                { props.pedido.mesa.numero }
            </td>
            { login.perfil === "GARCOM" ? <></> :
                <td className="flex justify-center items-center w-full whitespace-nowrap">
                    { props.pedido.data.slice(0, 11) }
                </td>
            }
            <td className="flex justify-center items-center w-full whitespace-nowrap">
                { hora }
            </td>
            { login.perfil === "GARCOM" ? <></> :
                <td className="flex justify-center items-center w-full whitespace-nowrap">
                    { props.pedido.status }
                </td>
            }
        </>          
    );
}

export default CardPedido;