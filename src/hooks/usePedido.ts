import { useState } from "react";
import Item from "../models/Item";

export default function usePedido() {
    
    const [pedido, setPedido] = useState<Array<Item>>([]);

    async function addToPedido(item: Item) {

        const newPedido = JSON.parse(localStorage.getItem("pedido") || '{}');

        if (pedido.length === 0 && newPedido === null) {
            setPedido([...pedido, item]);
            localStorage.setItem("pedido", JSON.stringify([...pedido, item]));
            return;
        }

        const search = newPedido.find((i: Item) => i.produto.id == item.produto.id);

        if (search) {
            search.quantidade++;
            localStorage.setItem("pedido", JSON.stringify(newPedido));
            return;
        } 

        setPedido([...newPedido, item]);
        localStorage.setItem("cart", JSON.stringify([...newPedido, item]));
    }

    async function removeToPedido(id: number) {
        
        const newPedido = JSON.parse(localStorage.getItem("pedido") || '{}');

        const search = newPedido.find((item: Item) => item.produto.id == id);

        if (search.quantidade > 1) {
            search.quantidade--;
        } else {
            const list = newPedido.find((item: Item) => item.produto.id !== id);
            setPedido(list);
            localStorage.setItem("pedido", JSON.stringify(list));
        }  
    }

    async function totalPedido() : Promise<number> {
        const newPedido = JSON.parse(localStorage.getItem("pedido") || '{}');

        const subTotal = newPedido.reduce((acumulador: number, item: Item) => acumulador + (item.produto.valor * item.quantidade));
        return subTotal;
    }

    async function clearPedido() {
        setPedido([]);
        localStorage.setItem("pedido", JSON.stringify([]));
    }

    return {
        addToPedido,
        removeToPedido,
        totalPedido,
        clearPedido,
    };
}