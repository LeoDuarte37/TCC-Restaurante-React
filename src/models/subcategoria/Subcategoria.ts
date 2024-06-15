import Categoria from "../categoria/Categoria";
import Produto from "../produto/Produto";

export default interface Subcategoria {
    id: number;
    nome: string;
    disponivel: boolean;
    categoria: Categoria;
    produto: Array<Produto>;
}