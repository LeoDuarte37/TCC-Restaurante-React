import Item from "./item/Item";

export default interface AddPedido {
    mesa: {
        id: number
    };
    item: Array<Item>;
}