import { useState } from "react";
import Item from "../models/Item";
import toastAlert from "../utils/toastAlert";

export default function usePedido() {

    const [ total, setTotal ] = useState<number>(0);

    async function addToPedido(item: Item) {
        const currentPedido = JSON.parse(localStorage.getItem("item") || "[]");

        const search = currentPedido.find((i: Item) => i.produto.id == item.produto.id);

        if (search) {
            search.quantidade++;
            localStorage.setItem("item", JSON.stringify(currentPedido)); 
        } else {
            localStorage.setItem("item", JSON.stringify([...currentPedido, item]));

            if (currentPedido.length === 0) {
                toastAlert("Acesse 'Meus pedidos' para visualizá-los!", "info");
            }
        }
    }

    async function updateQuantidade(produtoId: number, quantidade: number) {
        const currentPedido = JSON.parse(localStorage.getItem("item") || "[]");

        if (quantidade < 1) {
            const updateList = currentPedido.filter((i: Item) => i.produto.id !== produtoId);
            localStorage.setItem("item", JSON.stringify(updateList));
            toastAlert("Item removido!", "info");
        
        } else {
            const item = currentPedido.find((i: Item) => i.produto.id == produtoId);

            if (item) {
                item.quantidade = quantidade;
                localStorage.setItem("item", JSON.stringify(currentPedido));
            }
        }
    }
    
    async function totalPedido() {
        const currentPedido = JSON.parse(localStorage.getItem("item") || "[]");

        const subTotal = currentPedido.reduce((acumulador: number, item: Item) => acumulador + (item.produto.valor * item.quantidade), 0);

        setTotal(subTotal);
        return total;
    }

    async function clearPedido() {
        localStorage.setItem("item", JSON.stringify([]));
    }

    return {
        addToPedido,
        updateQuantidade,
        total,
        totalPedido,
        clearPedido,
    };
}