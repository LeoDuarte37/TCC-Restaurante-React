import Contato from "./Contato";

export default interface Usuario {
    id: number;
    nome: string;
    contato: Contato;
}