import { useEffect, useState } from "react";
import Categoria from "../../../models/Categoria";
import { buscarCardapio } from "../../../services/Service";
import toastAlert from "../../../utils/toastAlert";
import { TailSpin } from 'react-loader-spinner';
import CardCategoria from "../card/CardCategoria";
import ListaProduto from "../../produto/lista/ListaProduto";

function ListaCategoria() {
    
    const [categorias, setCategorias] = useState<Array<Categoria>>([
        {
            id: 1,
            nome: "Comida",
            foto: "https://st4.depositphotos.com/7578900/39879/i/450/depositphotos_398795566-stock-photo-brazilian-food-dish-lunch-executive.jpg",
            disponivel: true,
            produto: [],
        }, 
        {
            id: 1,
            nome: "Comida",
            foto: "https://st4.depositphotos.com/7578900/39879/i/450/depositphotos_398795566-stock-photo-brazilian-food-dish-lunch-executive.jpg",
            disponivel: true,
            produto: [],
        }
    ]);

    const [carregando, setCarregando] = useState<boolean>(false);

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
        <div>
            { carregando ? (
                <div className="pt-8">
                    <TailSpin 
                        visible={true}
                        height={150}
                        width={150}
                        color="#568C6D"
                        ariaLabel="tail-spin-loading"
                        radius={1}
                        wrapperStyle={{}}
                        wrapperClass=""
                    />
                </div>
            ) : (
                <div className="flex justify-center flex-col gap-3">
                    {categorias.map((categoria) => (
                        <>
                            <CardCategoria categoria={categoria}/>
                            {/* <ListaProduto produtos={categoria.produto}/> */}
                        </>
                    ))}
                </div>
            )}
        </div>
    );
}

export default ListaCategoria;