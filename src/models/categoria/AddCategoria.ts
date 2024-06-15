import Restaurante from "../restaurante/Restaurante";

export default interface AddCategoria {
    nome: string;
    disponivel: boolean;
    restaurante: Restaurante;
}