import { useEffect, useState } from "react";
import Item from "../models/pedido/item/Item";
import toastAlert from "../utils/toastAlert";
import AddPedido from "../models/pedido/AddPedido";
import Pedido from "../models/pedido/Pedido";
import { enviarPedido } from "../services/Service";

export default function usePedido() {

    const [total, setTotal] = useState<number>(0);

    const [pedidoEnviado, setPedidoEnviado] = useState<Array<Item>>([]);

    // Functions para carrinho de pedidos do cliente
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

        // async function updateObservacao(produtoId: number, observacao: string) {
        //     const currentPedido = JSON.parse(localStorage.getItem("item") || "[]");
        // }

        async function totalPedido() {
            const currentPedido = JSON.parse(localStorage.getItem("item") || "[]");

            const subTotal = currentPedido.reduce((acumulador: number, item: Item) => acumulador + (item.produto.valor * item.quantidade), 0);

            setTotal(subTotal);
            return total;
        }

        async function clearPedido() {
            localStorage.setItem("item", JSON.stringify([]));
        }
    //

    // Envio do pedido
        async function submitPedido(addPedido: AddPedido) {
            try {
                await enviarPedido(addPedido, setPedidoEnviado);
            } catch (error: any) {
                toastAlert("Erro ao enviar o pedido! Por favor, tente novamente.", "erro");
            }

        }

        // Setar o pedido enviado na conta do cliente
        useEffect(() => {
            const conta: Array<Item> = JSON.parse(localStorage.getItem("conta") || "[]");

            for (let item of pedidoEnviado) {
                const search = conta.find((i: Item) => i.produto.id == item.produto.id);

                if (search) {
                    search.quantidade++;
                    localStorage.setItem("conta", JSON.stringify(conta));
                } else {
                    localStorage.setItem("conta", JSON.stringify([...conta, item]));
                }
            }
        }, [pedidoEnviado]);
    //

    // Page de conta do cliente
        async function getInfoConta(itens: Array<Item>) {
            let valor: number = 0;
            let quantidade: number = 0;

            itens.map((item: Item) => {
                valor = valor + (item.produto.valor * item.quantidade);
                quantidade = quantidade + item.quantidade;
            });

            return [valor, quantidade];
        }

        // Limpar conta ao fechar 
        async function clearConta() {
            localStorage.setItem("conta", JSON.stringify([]));
        }
    //

    // Page de pedidos do restaurante
    async function getTotalPedidos(pedidos: Array<Pedido>) {
        let valor: number = 0;
        let quantidade: number = 0;

        pedidos.map((pedido) => {
            quantidade++;

            valor += pedido.item.reduce((acumulador, item) => (
                acumulador + (item.produto.valor * item.quantidade)
            ), 0);
        });

        return [valor, quantidade];
    }

   

    return {
        addToPedido,
        updateQuantidade,
        total,
        totalPedido,
        submitPedido,
        getInfoConta,
        getTotalPedidos,
        clearPedido,
        clearConta,
    };
}