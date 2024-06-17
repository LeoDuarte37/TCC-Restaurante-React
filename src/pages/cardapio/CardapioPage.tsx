import { useContext } from "react";
import ListaCategoria from "../../components/cardapio/categoria/lista/ListaCategoria";
import { LoginContext } from "../../contexts/LoginContext";

export default function CardapioPage() {

    const { login } = useContext(LoginContext);

    // async function buscarCategorias() {
    //     try {
    //         setCarregando(true);
    //         await buscarCardapio("/categoria/listar", setCategorias);
    //         setCarregando(false);
    //     } catch (error: any) {
    //         if (error.toString().includes("403")) {
    //             toastAlert("Token expirou, favor logar novamente.", "erro");
    //         }
    //     }
    // }

    // useEffect(() => {
    //     buscarCategorias();
    // }, [categorias.length]);

    return (
        <>
            {(login.perfil === "ROOT" || login.perfil === "ADMIN" || login.perfil === "CAIXA") &&
                <div className="flex justify-center w-full h-full bg-[#f8f8f8]">

                    {/* <div className="bg-[#3B1206] w-1 h-full"></div> */}
                    <ListaCategoria />
                </div>
            }
        </>
    )
}