import Categoria from "../categoria/Categoria";

export default interface AddSubcategoria {
    nome: string;
    disponivel: boolean;
    categoria: Categoria;
}