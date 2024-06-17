import axios from "axios";
import Logar from "../models/login/Logar";
import toastAlert from "../utils/toastAlert";
import LoginMesa from "../models/mesa/LoginMesa";
import AddMesa from "../models/mesa/AddMesa";
import AddProduto from "../models/produto/AddProduto";
import AddCategoria from "../models/categoria/AddCategoria";
import AddSubcategoria from "../models/subcategoria/AddSubcategoria";
import AddPedido from "../models/pedido/AddPedido";
import Status from "../models/Status";
import ListarPedidosPorMesaAndStatus from "../models/pedido/ListarPedidosPorMesaAndStatus";

const api = axios.create({
    baseURL: import.meta.env.VITE_API_URL
});

// Login
export const logar = async (dados: Logar, setDados: Function) => {
    const resposta = await api.post("/login", dados);
    setDados(resposta.data);
}

export const mesaLogin = async (dados: LoginMesa, setDados: Function) => {
    const resposta = await api.post("/mesa/login", dados);
    setDados(resposta);
}

// Mesa
export const buscarMesas = async (url: string, setDados: Function, header: Object) => {
    const resposta = await api.get(url, header);
    setDados(resposta);
}

export const atualizarChamarGarcom = async (mesaId: number, setDados: Function) => {
    const resposta = await api.patch(`/mesa/atualizar/chamarGarcom/${mesaId}`);
    setDados(resposta);
}

// Cardápio
export const buscarCardapio = async (url: string, setDados: Function) => {
    const resposta = await api.get(url);
    setDados(resposta.data);
}

// Pedido 
export const buscarPedidosPorStatusOuMesa = async (url: string, setDados: Function, config: Object) => {
    const resposta = await api.get(url, config);
    setDados(resposta.data);
}

export const buscarPedidosPorRestaurante = async (url: string, setDados: Function, header: Object) => {
    const resposta = await api.get(url, header);
    setDados(resposta.data);
}

export const enviarPedido = async (dados: AddPedido) => {
    const resposta = await api.post(`/pedido`, dados);
    if (resposta.status == 200) {
        toastAlert("Pedido enviado com sucesso!", "sucesso");
    }
}

// Adicionar ao restaurante
export const adicionar = async (url: string, dados: (AddMesa | AddCategoria | AddSubcategoria | AddProduto), header: Object, setDados: Function) => {
    const resposta = await api.post(url, dados, header);
    setDados(resposta.data);
}

export default api;