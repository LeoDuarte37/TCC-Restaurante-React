import { Note } from "@phosphor-icons/react";
import MeusPedidos from "../meusPedidos/MeusPedidos";

function MeusPedidosButton() {
    return (
        <div className="meusPedidos" onClick={() => {<MeusPedidos />}}>
            <Note size={32} color="white"/>
            <p>Meus pedidos</p>
        </div>
    )
}

export default MeusPedidosButton;