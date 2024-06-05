import Item from "./Item";
import Mesa from "./Mesa";

export default interface Pedido {
    id?: number;
    mesa: Mesa;
    item: Array<Item>;
    data?: string;
    status?: string;
}