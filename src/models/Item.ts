import Produto from "./Produto";

export default interface Item {
    produto: Produto;
    quantidade: number;
    observacao?: string;
}