import { ChefHat } from "@phosphor-icons/react";
import "./FormLogin.css"
import { useEffect, useState } from "react";

function FormLogin() {

    const [isMesa, setIsMesa] = useState<boolean>(false);

    return (
        <div className="flex flex-col 2xl:w-2/5 xl:w-2/5 md:w-3/4 max-[770px]:w-4/5 rounded-xl bg-white/5 p-6 max-[460px]:p-4 backdrop-blur-2xl">
            <label className="inline-flex items-center mb-5 cursor-pointer">
                <input type="checkbox" value="" className="sr-only peer" onClick={() => setIsMesa(!isMesa)}></input>
                <div className="relative w-9 h-5 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600">
                </div>
                <span className="ms-3 text-sm font-medium text-gray-900 dark:text-gray-300">Acessar mesa?</span>
            </label>

            <div className="div flex-1 flex-col justify-center px-6 py-12 lg:px-8">
                <div className="caixaContent logo sm:mx-auto sm:w-full sm:max-w-sm">
                    <div className='caixaTitle'>
                        <h1>Bon Chef</h1>
                        <ChefHat size={45} color='white' className="max-[375px]:hidden pl-2" />
                    </div>
                    <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-white-900">
                        {isMesa ? "Acesse uma mesa" : "Acesse sua conta"}
                    </h2>
                </div>

                <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
                    <form className="space-y-6 formLogin" action="#" method="POST">
                        <div>
                            <label htmlFor="email" className="block text-sm font-medium leading-6 text-white-900">
                                {isMesa ? "ID Restaurante" : "Usuário"}
                            </label>
                            <div className="mt-2">
                                <input
                                    id="email"
                                    name="email"
                                    type="text"
                                    autoComplete="email"
                                    placeholder={isMesa ? "8331faf7-db26-489c-9d9e-ac387d4983e0" : "user"}
                                    required
                                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                />
                            </div>
                        </div>
                        <div>
                            <div className="flex items-center justify-between">
                                <label htmlFor="password" className="block text-sm font-medium leading-6 text-white-900">
                                    {isMesa ? "Numero da mesa" : "Senha"}
                                </label>
                                { !isMesa &&
                                    <div className="text-sm">
                                        <a href="#" className="font-semibold text-blue-100 hover:text-blue-50">
                                            Esqueceu a senha?
                                        </a>
                                    </div>
                                }
                            </div>
                            <div className="mt-2">
                                <input
                                    id="password"
                                    name="password"
                                    type={isMesa? "text" : "password"}
                                    autoComplete="current-password"
                                    placeholder={isMesa ? "8" : "******"}
                                    required
                                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                />
                            </div>
                        </div>
                        <div>
                            <button
                                type="submit"
                                className="transition ease-in-out delay-50 flex w-full justify-center rounded-md bg-blue-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-blue-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                            >
                                Entrar
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}

export default FormLogin;