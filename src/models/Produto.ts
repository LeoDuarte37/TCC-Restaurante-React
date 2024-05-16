import Categoria from "./Categoria";

export default interface Produto {
    id: number;
    nome: string;
    descricao: string;
    foto: string;
    valor: number;
    disponivel: boolean;
    categoria: Categoria;
}