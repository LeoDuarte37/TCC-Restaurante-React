import Subcategoria from "../subcategoria/Subcategoria";

export default interface AddProduto {
    nome: string;
    descricao: string;
    foto: string;
    valor: number;
    disponivel: boolean;
    subCategoria: Subcategoria;
}