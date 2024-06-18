import SubCategoria from "../subcategoria/Subcategoria";

export default interface Categoria {
    id: number;
    nome: string;
    subcategoria: Array<SubCategoria>;
    disponivel: boolean;
}