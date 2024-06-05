import { createContext, ReactNode, useState } from "react";
import Logar from "../models/Logar";
import Sessao from "../models/Sessao";
import { logar } from "../services/Service";
import toastAlert from "../utils/toastAlert";

interface LoginContextProps {
    usuario: Sessao;
    isLoading: boolean;
    isMesa: boolean;
    changeContextIsMesa(): void;
    handleLogout(): void;
    handleLogin(login: Logar): Promise<void>; 
}

interface LoginProviderProps {
    children: ReactNode;
}

export const LoginContext = createContext( {} as LoginContextProps );

export function LoginProvider( {children} : LoginProviderProps ) {

    const [usuario, setUsuario] = useState<Sessao>({
        username: "",
        restaurante: {
            id: "",
            nome: "",
        },
        perfil: "",
        token: "",
    });

    const [isLoading, setIsLoading] = useState<boolean>(false);

    const [isMesa, setIsMesa] = useState(true);

    function changeContextIsMesa() {
        setIsMesa(!isMesa);
    }

    async function handleLogin(login: Logar) {
        setIsLoading(true);

        try {
            await logar(login, setUsuario);
            toastAlert("Login realizado com sucesso!", "sucesso");
            setIsLoading(false);
        } catch (error) {
            console.log(error);
            toastAlert("Dados de login inconsistentes!", "erro");
            setIsLoading(false);
        }
    }

    function handleLogout() {
        setUsuario({
            username: "",
            restaurante: {
                id: "",
                nome: "",
            },
            perfil: "",
            token: "",
        });
    }

    return (
        <LoginContext.Provider value = {{ usuario, isLoading , isMesa, changeContextIsMesa, handleLogin, handleLogout }}>
            { children }
        </LoginContext.Provider>
    );
}