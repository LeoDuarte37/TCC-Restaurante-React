import Produto from "../../produto/Produto";

export default interface Item {
    produto: Produto;
    quantidade: number;
    observacao?: string;
}