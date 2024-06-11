import Produto from "./Produto";
import SubCategoria from "./Subcategoria";

export default interface Categoria {
    id: number;
    nome: string;
    subCategoria: Array<SubCategoria>;
    disponivel: boolean;
}