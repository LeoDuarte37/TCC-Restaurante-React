import Produto from "./Produto";

export default interface Categoria {
    id: number;
    nome: string;
    disponivel: boolean;
    produto: Array<Produto>;
}