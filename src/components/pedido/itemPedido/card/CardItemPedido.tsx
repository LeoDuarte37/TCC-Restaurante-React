import { useContext } from "react";
import { LoginContext } from "../../../../contexts/LoginContext";
import Item from "../../../../models/Item";

function CardItemPedido(props: { item: Item }) {
    
    const { usuario } = useContext(LoginContext);

    return (
        <> 
            <th scope="row" className="flex justify-center items-center w-full h-12 p-0 font-medium whitespace-nowrap">
                {props.item.produto.nome}
            </th>
            <td className="flex justify-center items-center w-full h-12 p-0">
                {props.item.quantidade}
            </td>
            { (usuario.perfil === "COZINHA" || usuario.perfil === "GARCOM") ? <></> : 
                <td className="flex justify-center items-center w-full h-12 p-0">
                    R$ {props.item.produto.valor}
                </td>
            }
            <td className="flex justify-center items-center w-full h-12 p-0">
                {props.item.observacao}
            </td>
        </>
    );
}

export default CardItemPedido;