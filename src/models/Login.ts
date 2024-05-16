import Perfil from "./Perfil";
import Usuario from "./Usuario";

export default interface Login {
    username: string;
    senha: string;
    usuario: Usuario;
    perfil: Perfil;
}