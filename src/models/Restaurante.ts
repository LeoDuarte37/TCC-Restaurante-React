import Contato from "./Contato";
import Endereco from "./Endereco";

export default interface Restaurante {
    id: number;
    nome: string;
    cnpj: string;
    endereco: Endereco;
    contato: Contato;
}