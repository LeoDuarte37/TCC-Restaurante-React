import Mesa from "./Mesa";
import Restaurante from "./Restaurante";

export default interface Sessao {
    username: string;
    restaurante: Restaurante;
    perfil: string;
    token: string;
}