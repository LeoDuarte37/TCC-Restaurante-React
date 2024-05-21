import { ReactNode, createContext, useState } from "react";
import { buscarMesaPorId } from "../services/Service";
import Mesa from "../models/Mesa";
import toastAlert from "../utils/toastAlert";

interface MesaContextProps {
    mesa: Mesa;
    isLoading: boolean;
    handleMesaLogout(): void;
    handleMesaLogin(restauranteId: string, numeroMesa: number): Promise<void>;
}

interface MesaProviderProps {
    children: ReactNode;
}

export const MesaContext = createContext({} as MesaContextProps);

export function MesaProvider({ children }: MesaProviderProps) {

    const [mesa, setMesa] = useState<Mesa>({
        id: 0,
        numero: 0,
        restaurante: {
            id: "",
            nome: "",
        },
        chamarGarcom: false,
        status: "",
    });

    const [isLoading, setIsLoading] = useState<boolean>(false);

    async function handleMesaLogin(restauranteId: string, numeroMesa: number) {
        setIsLoading(true);

        try {
            await buscarMesaPorId(numeroMesa, setMesa);

            if (restauranteId === mesa.restaurante.id) {
                toastAlert(`Mesa ${mesa.numero} acessada com sucesso!`, "sucesso");
                setIsLoading(false);
            } else {
                toastAlert(`Você não possui permissão para acessar essa mesa!`, "erro");
                setIsLoading(false);
            }

        } catch (error) {
            console.log(error)
            toastAlert(`Dados da mesa inconsistentes!`, "erro");
            setIsLoading(false);
        }
    }

    function handleMesaLogout() {
        setMesa({
            id: 0,
            numero: 0,
            restaurante: {
                id: "",
                nome: "",
            },
            chamarGarcom: false,
            status: "",
        });
    }

    return (
        <MesaContext.Provider value={{ mesa, isLoading, handleMesaLogin, handleMesaLogout }}>
            { children }
        </MesaContext.Provider>
    );
}
