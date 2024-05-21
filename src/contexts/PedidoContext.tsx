import { ReactNode, createContext, useState, useContext } from "react";
import Item from "../models/Item";
import { MesaContext } from "./MesaContext";
import toastAlert from "../utils/toastAlert";

interface PedidoContextProps {
    mesaId: number;
    itens: Array<Item>;
    adicionarItem(item: Item) : void;
    removerItem(item: Item) : void;
    limparPedido() : void;
}

interface PedidoProviderProps {
    children: ReactNode;    
}

export const PedidoContext = createContext( {} as PedidoContextProps );

export function PedidoProvider( {children} : PedidoProviderProps ) {

    const { mesa, handleMesaLogout } = useContext(MesaContext);

    const [mesaId, setMesaId] = useState<number>(mesa.id);

    const [itens, setItens] = useState<Array<Item>>([]);

    function adicionarItem(item: Item) {
        if (mesa == null || mesaId == 0) {
            return toastAlert("Você precisa acessar uma mesa para adicionar um pedido!", "erro");
        }

        const itemExists = itens.find((i) => i.produto == item.produto);

        if (!itemExists) {
            itens.push(item);
            toastAlert(`${item.produto.nome} adicionado a lista de pedidos!`, "sucesso");
        } else {
            itens.find((itemExists) => itemExists.quantidade++);
        }

        setItens(itens);
    }

    function removerItem(item: Item) {
        if (mesa == null || mesaId == 0) {
            return toastAlert("Você precisa acessar uma mesa para adicionar um pedido!", "erro");
        }

        const itemExists = itens.find((i) => i.produto == item.produto);

        if (itemExists == null) {
            toastAlert("Erro ao processar o carrinho", "erro");
        } else {
            if (itemExists && itemExists.quantidade > 1) {
                itemExists.quantidade--;
                setItens(itens);
            } else {
                const filterList = itens.filter((i) => i.produto != item.produto);
                setItens(filterList);
                toastAlert("Item removido da lista de pedidos!", "sucesso");
            }
        }
    }

    function limparPedido() {
        if (mesa == null || mesaId == 0) {
            return toastAlert("Você precisa acessar uma mesa para adicionar um pedido!", "erro");
        }

        setItens([]);
        toastAlert("Lista de pedidos foi limpada!", "sucesso");
    }

    return (
        <PedidoContext.Provider value={{ mesaId, itens, adicionarItem, removerItem, limparPedido }}>
            {children}
        </PedidoContext.Provider>
    );
}

