import { ReactNode, createContext, useState } from "react";
import Destaque from "../models/Destaque";
import toastAlert from "../utils/toastAlert";

interface DestaqueContextProps {
    destaques: Array<Destaque>
    adicionarDestaque(destaque: Destaque): void;
    removerDestaque(index: number): void;
}

interface DestaqueProviderProps {
    children: ReactNode;
}

export const DestaqueContext = createContext({} as DestaqueContextProps);

export function DestaqueProvider({children} : DestaqueProviderProps) {

    const [destaques, setDetaques] = useState<Array<Destaque>>([
        {
            "foto": "https://http2.mlstatic.com/D_NQ_NP_984716-MLU74556662341_022024-O.webp",
            "nome": "Prato Especial",
            "descricao": "O clássico prato do restaurante"
        },
        {
            "foto": "https://http2.mlstatic.com/D_NQ_NP_984716-MLU74556662341_022024-O.webp",
            "nome": "Prato Especial",
            "descricao": "O clássico prato do restaurante"
        },
        {
            "foto": "https://http2.mlstatic.com/D_NQ_NP_984716-MLU74556662341_022024-O.webp",
            "nome": "Prato Especial",
            "descricao": "O clássico prato do restaurante"
        },
    ]);

    function adicionarDestaque(destaque: Destaque) {

        if (destaques.length = 3) {
            toastAlert("É permitido apenas a adição três destaques! Remova um para adicioná-lo", "erro");
        } else {
            destaques.push(destaque);
            toastAlert("Destaque adicionado com sucesso!", "sucesso");
        }
    }

    function removerDestaque(index: number) {

        let destaqueEntries = destaques.entries();

        if (destaques.length == 0) {
            toastAlert("Não possuem destaques para serem removidos!", "erro");
        } else {
            for (let entrie of destaqueEntries) {
                if (entrie[0] = index) {
                    destaques.splice(index, 1);
                    setDetaques(destaques);
                    toastAlert("Destaque adicionado com sucesso!", "sucesso");
                }
            }
        }
    }

    return (
        <DestaqueContext.Provider value = {{destaques, adicionarDestaque, removerDestaque}} >
            {children}
        </DestaqueContext.Provider>
    );
}