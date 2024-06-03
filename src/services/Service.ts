import axios from "axios";
import Logar from "../models/Logar";
import Login from "../models/Login";
import Categoria from "../models/Categoria";
import Mesa from "../models/Mesa";
import Perfil from "../models/Perfil";
import Produto from "../models/Produto";
import Restaurante from "../models/Restaurante";
import Pedido from "../models/Pedido";
import toastAlert from "../utils/toastAlert";

const api = axios.create({
    baseURL: import.meta.env.VITE_API_URL
});

// FUNÇÕES PARA USO DA MESA
export const enviarPedido = async (dados: Pedido) => {
    const resposta = await api.post(`/pedido`, dados);
    if (resposta.status == 200) {
        toastAlert("Pedido enviado com sucesso!", "sucesso");
    }
}

export const buscarMesaPorId = async (id: number, setDados: Function) => {
    const resposta = await api.get(`/mesa/${id}`);
    setDados(resposta.data);
}

export const buscarMesasPorRestaurante = async (restauranteId: string, setDados: Function, header: Object) => {
    const resposta = await api.get(`/mesa/${restauranteId}`, header);
    setDados(resposta);
}

export const buscarCardapio = async (url: string, setDados: Function) => {
    const resposta = await api.get(url);
    setDados(resposta.data);
}

// FUNÇÕES PARA USO DO RESTAURANTE
export const logar = async (dados: Logar, setDados: Function) => {
    const resposta = await api.post("/login", dados);
    setDados(resposta.data);
}

export const adicionar = async (url: string, dados: (Restaurante | Mesa | Produto | Categoria | Perfil), header: Object, setDados: Function) => {
    const resposta = await api.post(url, dados, header);
    setDados(resposta.data);
}

export const buscarPedidos = async (url: string, setDados: Function,  header: Object) => {
    const resposta = await api.get(url, header);
    setDados(resposta.data);
}

export default api;