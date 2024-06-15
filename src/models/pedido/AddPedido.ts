import Item from "./item/Item";
import Mesa from "../mesa/Mesa";

export default interface AddPedido {
    mesa: Mesa;
    item: Array<Item>;
}