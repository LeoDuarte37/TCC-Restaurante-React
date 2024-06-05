import FormLogin from '../../components/login/forms/FormLogin';
import { useContext } from 'react';
import { ChefHat } from '@phosphor-icons/react';
import { LoginContext } from '../../contexts/LoginContext';
import "./LoginPage.css";

function LoginPage() {

    const { isMesa, changeContextIsMesa } = useContext(LoginContext);

    return (
        <>
            <div className="container flex justify-center items-center">
                <div className="flex flex-col 2xl:w-2/5 xl:w-2/5 md:w-3/4 max-[770px]:w-4/5 rounded-xl bg-white/5 p-6 max-[460px]:p-4 backdrop-blur-2xl">
                    <label className="inline-flex items-center mb-5 cursor-pointer">
                        <input type="checkbox" value="" className="sr-only peer" onClick={changeContextIsMesa}></input>
                        <div className="relative w-9 h-5 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600">
                        </div>
                        <span className="ms-3 text-sm font-medium text-gray-900 dark:text-gray-300">Acessar mesa?</span>
                    </label>

                    <div className="div flex-1 flex-col justify-center px-6 py-12 lg:px-8">
                        <div className="caixaContent logo sm:mx-auto sm:w-full sm:max-w-sm">
                            <div className='caixaTitle'>
                                <h1>Bon Chef</h1>
                                <ChefHat size={55} color='white' className="h-[40px] max-[375px]:hidden pl-2" />
                            </div>
                            <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-white-900">
                                {isMesa ? "Acesse uma mesa" : "Acesse sua conta"}
                            </h2>
                        </div>

                        <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
                            <FormLogin isMesa={isMesa} />   
                        </div>           
                    </div>
                </div>
            </div>
        </>
    );
}

export default LoginPage;