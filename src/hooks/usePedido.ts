import { useState } from "react";
import Item from "../models/Item";
import toastAlert from "../utils/toastAlert";

export default function usePedido() {
    
    const [pedido, setPedido] = useState<Array<Item>>([]);

    const [total, setTotal] = useState<number>(0);

    async function addToPedido(item: Item) {
        const newPedido = JSON.parse(localStorage.getItem("pedido") || "[]");

        if (pedido.length === 0 && newPedido === null) {
            setPedido([...pedido, item]);
            localStorage.setItem("pedido", JSON.stringify([...pedido, item]));

        } else {
            const search = newPedido.find((i: Item) => i.produto.id == item.produto.id);
    
            if (search) {
                search.quantidade++;
                setPedido(newPedido);
                localStorage.setItem("pedido", JSON.stringify(newPedido)); 
            } 
        }
    }

    async function updateQuantidade(produtoId: number, quantidade: number) {
        const pedido = JSON.parse(localStorage.getItem("pedido") || "[]");

        if (quantidade == 0) {

            if (pedido.length == 1) {
                localStorage.setItem("pedido", "[]");
                toastAlert("Item removido!", "sucesso");
            } else {
                const updateList = pedido.find((i: Item) => i.produto.id !== produtoId);
                localStorage.setItem("pedido", JSON.stringify([...updateList]));
                toastAlert("Item removido!", "sucesso");
            }
            
        } else {
            const item = pedido.find((i: Item) => i.produto.id == produtoId);

            if (item) {
                item.quantidade = quantidade;
                localStorage.setItem("pedido", JSON.stringify([...pedido]));
            }
        }
    }
    
    async function totalPedido() {
        const newPedido = JSON.parse(localStorage.getItem("pedido") || "[]");

        const subTotal = newPedido.reduce((acumulador: number, item: Item) => acumulador + (item.produto.valor * item.quantidade), 0);

        setTotal(subTotal);
        return total;
    }

    async function clearPedido() {
        setPedido([]);
        localStorage.setItem("pedido", JSON.stringify([]));
    }

    return {
        addToPedido,
        updateQuantidade,
        total,
        totalPedido,
        clearPedido,
    };
}