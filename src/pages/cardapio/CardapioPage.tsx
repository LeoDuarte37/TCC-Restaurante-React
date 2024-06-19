import { useContext, useEffect, useState } from "react";
import ListaCategoria from "../../components/cardapio/categoria/lista/ListaCategoria";
import { LoginContext } from "../../contexts/LoginContext";
import Categoria from "../../models/categoria/Categoria";
import toastAlert from "../../utils/toastAlert";
import { useNavigate } from "react-router-dom";
import { TailSpin } from "react-loader-spinner";
import { getCategorias } from "../../services/Service";

export default function CardapioPage() {

    const { login, handleLogout } = useContext(LoginContext);

    const navigate = useNavigate();

    const [categorias, setCategorias] = useState<Array<Categoria>>([]);

    const [isLoading, setIsLoading] = useState<boolean>(false);

    async function buscarCategorias() {
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
            }
        }
    }

    useEffect(() => {
        buscarCategorias();
    }, []);

    return (
        <>
            {(login.perfil === "ROOT" || login.perfil === "ADMIN" || login.perfil === "CAIXA") &&
                <div className="flex justify-center w-full h-full bg-[#f8f8f8]">
                    {isLoading ? (
                        <div className="pt-8">
                            <TailSpin
                                visible={true}
                                height={100}
                                width={100}
                                color="#D42300"
                                ariaLabel="tail-spin-loading"
                                radius={1}
                                wrapperStyle={{}}
                                wrapperClass=""
                            />
                        </div>
                    ) : <ListaCategoria categorias={categorias} /> }

                    {/* <div className="bg-[#3B1206] w-1 h-full"></div> */}
                </div>
            }
        </>
    )
}