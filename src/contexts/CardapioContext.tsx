import { ReactNode, createContext, useContext, useEffect, useState } from "react";
import Categoria from "../models/categoria/Categoria";
import Subcategoria from "../models/subcategoria/Subcategoria";
import { LoginContext } from "./LoginContext";
import { useNavigate } from "react-router-dom";
import { getCategorias } from "../services/Service";
import toastAlert from "../utils/toastAlert";
import { MesaContext } from "./MesaContext";
import { buscarCardapio } from "./../services/Service";

interface CardapioContextProps {
    categorias: Array<Categoria>;
    subcategoriaAtual: Subcategoria;
    isLoading: boolean;
    buscarCategorias(): void;
    setSubCategoriaAtual: Function;
}

interface CardapioProviderProps {
    children: ReactNode;
}

export const CardapioContext = createContext({} as CardapioContextProps);

export function CardapioProvider( {children} : CardapioProviderProps ) {
    const { login, handleLogout } = useContext(LoginContext);
    const { mesa } = useContext(MesaContext);

    const navigate = useNavigate();
    
    const [categorias, setCategorias] = useState<Array<Categoria>>([]);
    const [subcategoriaAtual, setSubCategoriaAtual] = useState<Subcategoria>(categorias[0]?.subcategoria[0]);
    const [isLoading, setIsLoading] = useState<boolean>(false);

    async function buscarCategorias() {
        if (login.token != '') {
            try {
                setIsLoading(true);
    
                await getCategorias(`/categoria/listar/restaurante/${login.restauranteId}`, setCategorias, {
                    headers: {
                        Authorization: `Bearer ${login.token}`,
                    },
                });
    
                setIsLoading(false);
            } catch (error: any) {
                if (error.toString().includes("403")) {
                    toastAlert("Token expirou, favor logar novamente.", "erro");
                    handleLogout();
                    navigate('/');
                    setIsLoading(false)
                }
            }
        } else {
            setIsLoading(true);
            await buscarCardapio(`/categoria/listar/disponiveis/restaurante/${mesa.restauranteId}`, setCategorias);

            setIsLoading(false);
        }
    }

    useEffect(() => {
        buscarCategorias();
        setSubCategoriaAtual(categorias[0]?.subcategoria[0]);
    }, []);

    useEffect(() => {
        setSubCategoriaAtual(categorias[0]?.subcategoria[0]);
    }, [categorias]);

    return (
        <CardapioContext.Provider value={{categorias, subcategoriaAtual, isLoading, buscarCategorias, setSubCategoriaAtual}}>
            {children}
        </CardapioContext.Provider>
    )
}