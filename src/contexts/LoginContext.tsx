import { createContext, ReactNode, useState } from "react";
import Logar from "../models/Logar";
import Sessao from "../models/Sessao";
import { logar } from "../services/Service";
import toastAlert from "../utils/toastAlert";


interface LoginContextProps {
    usuario: Sessao;
    handleLogout(): void;
    handleLogin(login: Logar): Promise<void>; 
    isLoading: boolean;
}

interface LoginProviderProps {
    children: ReactNode;
}

export const LoginContext = createContext( {} as LoginContextProps );

function LoginProvider( {children} : LoginProviderProps ) {

    const [usuario, setUsuario] = useState<Sessao>({
        username: "",
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
            perfil: "",
            token: "",
        });
    }

    return (
        <LoginContext.Provider value ={{ usuario, handleLogin, handleLogout, isLoading }}>
            { children }
        </LoginContext.Provider>
    );
}


export default LoginProvider;