import Item from "./item/Item";

export default interface Pedido {
    id: number;
    mesa: {
        id: number;
        numero: number;
    };
    item: Array<Item>;
    data: string;
    status: string;
}