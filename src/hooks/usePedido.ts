import { useState } from "react";
import Item from "../models/Item";
import toastAlert from "../utils/toastAlert";

export default function usePedido() {
    
    const [pedido, setPedido] = useState<Array<Item>>([]);

    async function addToPedido(item: Item) {

        const newPedido = JSON.parse(localStorage.getItem("pedido") || "[]");

        if (pedido.length === 0 && newPedido === null) {
            setPedido([...pedido, item]);
            localStorage.setItem("pedido", JSON.stringify([...pedido, item]));

            toastAlert("Item adicionado aos seus pedidos com sucesso!", "sucesso");
            return;
        }

        const search = newPedido.find((i: Item) => i.produto.id == item.produto.id);

        if (search) {
            search.quantidade++;
            setPedido(newPedido);
            localStorage.setItem("pedido", JSON.stringify(newPedido));
            return;
        } 

        setPedido([...newPedido, item]);
        localStorage.setItem("pedido", JSON.stringify([...newPedido, item]));
    }

    async function updatePedido(id: number, quantidade: number) {
        
        const newPedido = JSON.parse(localStorage.getItem("pedido") || "[]");

        const search = newPedido.find((item: Item) => item.produto.id == id);

        if (search && search.quantidade > 1) {
            search.quantidade = quantidade;
            setPedido(newPedido);
            localStorage.setItem("pedido", JSON.stringify(newPedido));
        } else {
            const list = newPedido.find((item: Item) => item.produto.id !== id);
            setPedido(list);
            localStorage.setItem("pedido", JSON.stringify(list));
            toastAlert("Item removido com sucesso!", "sucesso");
        }  
    }

    async function totalPedido() {
        const newPedido = JSON.parse(localStorage.getItem("pedido") || "[]");

        const subTotal = newPedido.reduce((acumulador: number, item: Item) => acumulador + (item.produto.valor * item.quantidade), 0);
        return subTotal;
    }

    async function clearPedido() {
        setPedido([]);
        localStorage.setItem("pedido", JSON.stringify([]));
    }

    return {
        addToPedido,
        updatePedido,
        totalPedido,
        clearPedido,
    };
}