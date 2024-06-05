import { ReactNode, createContext, useState } from "react";
import Mesa from "../models/Mesa";

interface ChamandoGarcomContextProps {
    mesas: Array<Mesa>,
    atualizarMesas(listMesas: Array<Mesa>): void
}

interface ChamandoGarcomProviderProps {
    children: ReactNode;
}

export const ChamandoGarcomContext = createContext({} as ChamandoGarcomContextProps);

export function ChamandoGarcomProvider({ children } : ChamandoGarcomProviderProps) {

    const [ mesas, setMesas ] = useState<Array<Mesa>>([]);

    function atualizarMesas(listMesas: Array<Mesa>) {
        setMesas(listMesas);
    }

    return (
        <ChamandoGarcomContext.Provider value={{ mesas, atualizarMesas }} >
            { children }
        </ChamandoGarcomContext.Provider>
    )
}