import Categoria from "./Categoria";
import Produto from "./Produto";

export default interface Subcategoria {
    id: number;
    nome: string;
    categoria?: Categoria;
    produto: Array<Produto>;
    disponivel: boolean;
}