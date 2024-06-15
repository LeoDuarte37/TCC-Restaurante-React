import Item from "./item/Item";
import Mesa from "../mesa/Mesa";

export default interface Pedido {
    id: number;
    mesa: Mesa;
    item: Array<Item>;
    data: string;
    status: string;
}