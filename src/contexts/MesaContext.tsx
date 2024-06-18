import { ReactNode, createContext, useState } from "react";
import Mesa from "../models/mesa/Mesa";
import toastAlert from "../utils/toastAlert";
import LoginMesa from "../models/mesa/LoginMesa";
import { mesaLogin } from "../services/Service";

interface MesaContextProps {
    mesa: Mesa;
    handleMesaLogout(): void;
    handleMesaLogin(mesaLogin: LoginMesa): Promise<boolean>;
    atualizarMesa(mesa: Mesa): void;
}

interface MesaProviderProps {
    children: ReactNode;
}

export const MesaContext = createContext({} as MesaContextProps);

export function MesaProvider({ children }: MesaProviderProps) {

    const [mesa, setMesa] = useState<Mesa>({
        id: 0,
        numero: 0,
        restauranteId: 0,
        restauranteUuid: "",
        chamarGarcom: false,
        status: "",
    });

    async function handleMesaLogin(loginMesa: LoginMesa) : Promise<boolean> {
        try {
            await mesaLogin(loginMesa, atualizarMesa);

            if (mesa.restauranteUuid === loginMesa.uuid) {
                toastAlert(`Mesa ${mesa.numero} acessada com sucesso!`, "sucesso");
                return true;
            } else {
                toastAlert(`Dados inconsistentes!`, "erro");
                return false;
            }

        } catch (error) {
            toastAlert(`Dados inconsistentes!`, "erro");
            return false;
        }
    }

    function handleMesaLogout() {
        setMesa({
            id: 0,
            numero: 0,
            restauranteId: 0,
            restauranteUuid: "",
            chamarGarcom: false,
            status: "",
        });
    }

    function atualizarMesa(mesa: Mesa) {
        setMesa(mesa);
    }

    return (
        <MesaContext.Provider value={{ mesa, handleMesaLogin, handleMesaLogout, atualizarMesa }}>
            { children }
        </MesaContext.Provider>
    );
}
