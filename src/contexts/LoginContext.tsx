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
        restauranteId: 1,
        perfil: "ADMIN",
        token: "",
    });
    
    async function handleLogin(login: Logar) {
        setIsLoading(true);
        
        try {
            await logar(login, setLogin);
            toastAlert("Login realizado com sucesso!", "sucesso");
            setIsLoading(false);
        } catch (error) {
            console.log(error);
            toastAlert("Dados de login inconsistentes!", "erro");
            setIsLoading(false);
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

    function changeContextIsMesa() {
        setIsMesa(!isMesa);
    }
    
    return (
        <LoginContext.Provider value = {{ login, isLoading , isMesa, changeContextIsMesa, handleLogin, handleLogout }}>
            { children }
        </LoginContext.Provider>
    );
}