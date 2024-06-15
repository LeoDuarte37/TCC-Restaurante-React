import { useState } from "react";
import Logar from "../../../models/login/Logar";

function FormLogin(props: { isMesa: boolean; }) {

    const [logar, setLogar] = useState<Logar>({
        username: "",
        senha: ""
    });


    return (
        <form className="space-y-6 " id="formLogin" action="#" method="POST">
            <fieldset>
                <label htmlFor="username" className="block text-md font-medium leading-6 text-[#3B1206]">
                    {props.isMesa ? "ID Restaurante" : "Usuário"}
                </label>
                <div className="mt-2">
                    <input
                        name="username"
                        type="text"
                        placeholder={props.isMesa ? "8331faf7-db26-489c-9d9e-ac387d4983e0" : "user"}
                        required
                        className="block w-full rounded-md border-0 py-1.5 text-[#3B1206] shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-[#D42300] sm:text-sm sm:leading-6"
                    />
                </div>
            </fieldset>
            <fieldset>
                <div className="flex items-center justify-between">
                    <label htmlFor="password" className="block text-md font-medium leading-6 text-[#3B1206]">
                        {props.isMesa ? "Número da mesa" : "Senha"}
                    </label>
                    {!props.isMesa &&
                        <div className="text-md">
                            <a href="#" className="font-semibold text-[#D42300] hover:text-[#b51f02]">
                                Esqueceu a senha?
                            </a>
                        </div>
                    }
                </div>
                <div className="mt-2">
                    <input
                        name="password"
                        type={props.isMesa ? "text" : "password"}
                        autoComplete="current-password"
                        placeholder={props.isMesa ? "8" : "******"}
                        required
                        className="block w-full rounded-md border-0 py-1.5 text-[#3B1206] shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-[#D42300] sm:text-sm sm:leading-6"
                    />
                </div>
            </fieldset>
            
            <button
                type="submit"
                className="transition ease-in-out delay-50 flex w-full justify-center rounded-md bg-[#D42300] px-3 py-1.5 text-md font-semibold leading-6 text-white shadow-sm hover:bg-[#b51f02] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
            >
                Entrar
            </button>
        
        </form>
    );
}

export default FormLogin;