import Produto from "../produto/Produto";

export default interface Subcategoria {
    id: number;
    nome: string;
    disponivel: boolean;
    produto: Array<Produto>;
}