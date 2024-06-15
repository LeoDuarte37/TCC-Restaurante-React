import SubCategoria from "../subcategoria/Subcategoria";

export default interface Categoria {
    id: number;
    nome: string;
    subCategoria: Array<SubCategoria>;
    disponivel: boolean;
}