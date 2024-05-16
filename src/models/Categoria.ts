import Produto from "./Produto";

export default interface Categoria {
    id: number;
    nome: string;
    foto: string;
    disponivel: boolean;
    produto: Array<Produto>;
}