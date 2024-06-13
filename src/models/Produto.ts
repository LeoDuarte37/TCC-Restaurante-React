import Subcategoria from "./SubCategoria";

export default interface Produto {
    id: number;
    nome: string;
    descricao: string;
    foto: string;
    valor: number;
    disponivel: boolean;
    subCategoria?: Subcategoria;
}