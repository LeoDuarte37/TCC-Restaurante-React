import Contato from "../contato/Contato";

export default interface Usuario {
    id: number;
    nome: string;
    contato: Contato;
}