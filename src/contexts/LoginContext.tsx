import { createContext, ReactNode, useState } from "react";
import Logar from "../models/Logar";
import Sessao from "../models/Sessao";
import { logar } from "../services/Service";
import toastAlert from "../utils/toastAlert";

interface LoginContextProps {
    usuario: Sessao;
    isLoading: boolean;
    handleLogout(): void;
    handleLogin(login: Logar, isMesa: boolean, mesaId?: number): Promise<void>; 
}

interface LoginProviderProps {
    children: ReactNode;
}

export const LoginContext = createContext( {} as LoginContextProps );

export function LoginProvider( {children} : LoginProviderProps ) {

    const [usuario, setUsuario] = useState<Sessao>({
        username: "",
        restaurante: {
            id: 0,
            nome: "",
        },
        perfil: "",
        token: "",
    });

    const [isLoading, setIsLoading] = useState<boolean>(false);

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
        <LoginContext.Provider value = {{ usuario, handleLogin, handleLogout, isLoading }}>
            { children }
        </LoginContext.Provider>
    );
}