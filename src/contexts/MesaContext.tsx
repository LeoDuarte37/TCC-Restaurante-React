import { ReactNode, createContext, useState } from "react";
import Mesa from "../models/mesa/Mesa";
import toastAlert from "../utils/toastAlert";
import LoginMesa from "../models/mesa/LoginMesa";
import { loginMesa } from "../services/Service";

interface MesaContextProps {
    mesa: Mesa;
    handleMesaLogout(): void;
    handleMesaLogin(mesaLogin: LoginMesa): Promise<void>;
    atualizarMesa(mesa: Mesa): void;
}

interface MesaProviderProps {
    children: ReactNode;
}

export const MesaContext = createContext({} as MesaContextProps);

export function MesaProvider({ children }: MesaProviderProps) {

    const [mesa, setMesa] = useState<Mesa>({
        id: 0,
        numero: 10,
        restauranteId: 0,
        restauranteUuid: "",
        chamarGarcom: false,
        status: "",
    });

    async function handleMesaLogin(mesaLogin: LoginMesa) {
        try {
            await loginMesa(mesaLogin, setMesa);

            if (mesa.restauranteUuid === mesaLogin.uuid) {
                toastAlert(`Mesa ${mesa.numero} acessada com sucesso!`, "sucesso");
            } else {
                toastAlert(`Dados inconsistentes!`, "erro");
            }

        } catch (error) {
            toastAlert(`Dados inconsistentes!`, "erro");
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
