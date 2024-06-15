import Contato from "../contato/Contato";
import Endereco from "../endereco/Endereco";

export default interface Restaurante {
    id: string;
    nome: string;
    cnpj?: string;
    endereco?: Endereco;
    contato?: Contato;
}