import axios from "axios";
import Logar from "../models/Logar";
import Login from "../models/Login";
import Categoria from "../models/Categoria";
import Mesa from "../models/Mesa";
import Perfil from "../models/Perfil";
import Produto from "../models/Produto";
import Restaurante from "../models/Restaurante";

const api = axios.create({
    baseURL: import.meta.env.VITE_API_URL
});

// FUNÇÕES PARA USO DA MESA
export const cardapio = async (url: string, setDados: Function) => {
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


export default api;