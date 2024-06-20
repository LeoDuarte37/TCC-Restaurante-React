import { useContext, useEffect } from "react";
import ListaCategoria from "../../components/cardapio/categoria/lista/ListaCategoria";
import { LoginContext } from "../../contexts/LoginContext";
import { TailSpin } from "react-loader-spinner";
import { CardapioContext } from "../../contexts/CardapioContext";

export default function CardapioPage() {

    const { login } = useContext(LoginContext);
    const { categorias, isLoading, buscarCategorias, setSubCategoriaAtual } = useContext(CardapioContext);

    useEffect(() => {
        buscarCategorias();
        setSubCategoriaAtual(categorias[0]?.subcategoria[0]);
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
                    ) : <ListaCategoria /> }

                    {/* <div className="bg-[#3B1206] w-1 h-full"></div> */}
                </div>
            }
        </>
    )
}