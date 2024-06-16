import axios from "axios";
import Logar from "../models/login/Logar";
import Categoria from "../models/categoria/Categoria";
import Mesa from "../models/mesa/Mesa";
import Perfil from "../models/perfil/Perfil";
import Produto from "../models/produto/Produto";
import Restaurante from "../models/restaurante/Restaurante";
import Pedido from "../models/pedido/Pedido";
import toastAlert from "../utils/toastAlert";
import MesaChamarGarcom from "../models/MesaChamarGarcom";
import LoginMesa from "../models/mesa/LoginMesa";

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

export const atualizarChamarGarcom = async (mesa: MesaChamarGarcom, setDados: Function) => {
    const resposta = await api.patch(`/mesa/atualizar/chamarGarcom`, mesa);
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

export const mesaLogin = async (dados: LoginMesa, setDados: Function) => {
    const resposta = await api.post("/mesa/login", dados);
    setDados(resposta);
}

export const adicionar = async (url: string, dados: (Restaurante | Mesa | Produto | Categoria | Perfil), header: Object, setDados: Function) => {
    const resposta = await api.post(url, dados, header);
    setDados(resposta.data);
}

export const buscarPedidos = async (url: string, setDados: Function,  header: Object) => {
    const resposta = await api.get(url, header);
    setDados(resposta.data);
}

export const listarChamandoGarcom = async (restauranteId: string, setDados: Function, header: Object) => {
    const resposta = await api.get(`/mesa/listar/chamandoGarcom/` + {restauranteId}, header);
    setDados(resposta);
}

export default api;