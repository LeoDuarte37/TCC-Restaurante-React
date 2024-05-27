import Produto from "./Produto";
import SubCategoria from "./SubCategoria";

export default interface Categoria {
    id: number;
    nome: string;
    subCategoria: Array<SubCategoria>;
    disponivel: boolean;
}