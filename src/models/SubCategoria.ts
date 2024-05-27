import Categoria from "./Categoria";
import Produto from "./Produto";

export default interface SubCategoria {
    id: number;
    nome: string;
    categoria?: Categoria;
    produto: Array<Produto>;
    disponivel: boolean;
}