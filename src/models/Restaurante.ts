import Contato from "./Contato";
import Endereco from "./Endereco";

export default interface Restaurante {
    id: string;
    nome: string;
    cnpj?: string;
    endereco?: Endereco;
    contato?: Contato;
}