import { createContext, ReactNode, useState } from "react";
import Logar from "../models/login/Logar";
import Login from "../models/login/Login";
import { logar } from "../services/Service";
import toastAlert from "../utils/toastAlert";

interface LoginContextProps {
    login: Login;
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

    const [isLoading, setIsLoading] = useState<boolean>(false);

    const [login, setLogin] = useState<Login>({
        username: "",
        restauranteId: 0,
        perfil: "",
        token: "",
    });
    
    async function handleLogin(credenciais: Logar) {
        try {
            await logar(credenciais, atualizarLogin);
            

            toastAlert("Login realizado com sucesso!", "sucesso");
        } catch (error) {
            console.log(error);
            toastAlert("Dados de login inconsistentes!", "erro");
        }
    }
    
    function handleLogout() {
        setLogin({
            username: "",
            restauranteId: 0,
            perfil: "",
            token: "",
        });
    }

    const [isMesa, setIsMesa] = useState(false);

    function atualizarLogin(login: Login) {
        setLogin(login);
    }

    function changeContextIsMesa() {
        setIsMesa(!isMesa);
    }
    
    return (
        <LoginContext.Provider value = {{ login, isLoading , isMesa, changeContextIsMesa, handleLogin, handleLogout }}>
            { children }
        </LoginContext.Provider>
    );
}