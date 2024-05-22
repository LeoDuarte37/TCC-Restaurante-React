import { ReactNode, createContext, useState } from "react";


interface FormLoginContextProps {
    isMesa: boolean;
    changeContextFormLogin(): void;
}

interface FormLoginProviderProps {
    children: ReactNode;
}

export const FormLoginContext = createContext( {} as FormLoginContextProps);

export function FormLoginProvider( {children}: FormLoginProviderProps ) {

    const [isMesa, setIsMesa] = useState(false);

    function changeContextFormLogin() {
        setIsMesa(!isMesa);
    }

    return (
        <FormLoginContext.Provider value={{ isMesa, changeContextFormLogin }} >
            {children}
        </FormLoginContext.Provider>
    )
}