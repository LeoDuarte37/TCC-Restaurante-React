import Item from "./item/Item";

export default interface Pedido {
    id: number;
    mesa: {
        numero: number;
    };
    item: Array<Item>;
    data: string;
    status: string;
}