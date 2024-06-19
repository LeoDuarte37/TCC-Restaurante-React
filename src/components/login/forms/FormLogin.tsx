import { ChangeEvent, useContext, useState } from "react";
import Logar from "../../../models/login/Logar";
import LoginMesa from "../../../models/mesa/LoginMesa";
import { LoginContext } from "../../../contexts/LoginContext";
import { MesaContext } from "../../../contexts/MesaContext";
import { RotatingLines } from "react-loader-spinner";
import { useNavigate } from "react-router-dom";
import "./../../../App.css"

function FormLogin() {
    const navigate = useNavigate();

    const { isMesa, handleLogin } = useContext(LoginContext);
    const { handleMesaLogin } = useContext(MesaContext);

    const [logar, setLogar] = useState<Logar>({} as Logar);

    const [mesaLogin, setMesaLogin] = useState<LoginMesa>({} as LoginMesa);

    const [isLoading, setIsLoading] = useState<boolean>(false);

    function atualizarEstado(e: ChangeEvent<HTMLInputElement>) {
        if (!isMesa) {
            setLogar({
                ...logar,
                [e.target.name]: e.target.value
            })
        } else {
            setMesaLogin({
                ...mesaLogin,
                [e.target.name]: e.target.value
            })
        }
    }

    async function submit(e: ChangeEvent<HTMLFormElement>) {
        setIsLoading(true);
        e.preventDefault();

        if (!isMesa) {
            try {
                await handleLogin(logar);
                setIsLoading(false);
                navigate('/historico/pedidos')
            } catch (error: any) {
                console.log(error);
                setIsLoading(false);
            }
        } else {
            try {
                const acessoLiberado = await handleMesaLogin(mesaLogin);

                setIsLoading(false);

                if (acessoLiberado) {
                    navigate('/mesa/cardapio');    
                }

            } catch (error: any) {
                console.log(error);
                setIsLoading(false);
            }
        }
    }

    return (
        <>
            <form className="space-y-6 " id="formLogin" method="POST" onSubmit={submit}>
                <fieldset>
                    <label htmlFor={!isMesa ? "username" : "uuid"} className="block text-md font-medium leading-6 text-[#3B1206]">
                        {!isMesa ? "Usuário" : "ID Restaurante"}
                    </label>
                    <div className="mt-2">
                        <input
                            name={!isMesa ? "username" : "uuid"}
                            type="text"
                            placeholder={!isMesa ? "user" : "8331faf7-db26-489c-9d9e-ac387d4983e0"}
                            required
                            onChange={(e: ChangeEvent<HTMLInputElement>) => atualizarEstado(e)}
                            className="block w-full rounded-md border-0 py-1.5 text-[#3B1206] shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-[#D42300] sm:text-sm sm:leading-6"
                        />
                    </div>
                </fieldset>
                <fieldset>
                    <div className="flex items-center justify-between">
                        <label htmlFor={!isMesa ? "senha" : "numero"}
                            className="block text-md font-medium leading-6 text-[#3B1206]">
                            {!isMesa ? "Senha" : "Número da mesa"}
                        </label>
                        {!isMesa &&
                            <div className="text-md">
                                <a href="#" className="font-semibold text-[#D42300] hover:text-[#b51f02]">
                                    Esqueceu a senha?
                                </a>
                            </div>
                        }
                    </div>
                    <div className="mt-2">
                        <input
                            name={!isMesa ? "senha" : "numero"}
                            type={!isMesa ? "password" : "text"}
                            placeholder={!isMesa ? "******" : "8"}
                            required
                            onChange={(e: ChangeEvent<HTMLInputElement>) => atualizarEstado(e)}
                            className="block w-full rounded-md border-0 py-1.5 text-[#3B1206] shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-[#D42300] sm:text-sm sm:leading-6"
                        />
                    </div>
                </fieldset>

                <button
                    type="submit"
                    className="transition ease-in-out delay-50 flex w-full justify-center rounded-md bg-[#D42300] px-3 py-1.5 text-md font-semibold leading-6 text-white shadow-sm hover:bg-[#b51f02] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                >
                    {isLoading ? (
                        <RotatingLines
                            strokeColor="white"
                            strokeWidth="5"
                            animationDuration="0.75"
                            width="24"
                            visible={true}
                        />
                    ) : "Entrar"}
                </button>
            </form>
        </>
    );
}

export default FormLogin;