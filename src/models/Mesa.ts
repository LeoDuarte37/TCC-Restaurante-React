import Restaurante from "./Restaurante";

export default interface Mesa {
    id: number;
    numero: number;
    restaurante: Restaurante;
    status?: string;
    chamarGarcom?: boolean;
}