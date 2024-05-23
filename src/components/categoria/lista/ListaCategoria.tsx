import { useEffect, useState } from "react";
import Categoria from "../../../models/Categoria";
import { buscarCardapio } from "../../../services/Service";
import toastAlert from "../../../utils/toastAlert";
import { TailSpin } from 'react-loader-spinner';
import CardCategoria from "../card/CardCategoria";
import ListaProduto from "../../produto/lista/ListaProduto";
import Produto from "../../../models/Produto";
import CardProduto from "../../produto/card/CardProduto";

function ListaCategoria(props : { isCardapio: boolean; }) {

    const [categorias, setCategorias] = useState<Array<Categoria>>([
        {
            id: 1,
            nome: "Comida",
            foto: "https://st4.depositphotos.com/7578900/39879/i/450/depositphotos_398795566-stock-photo-brazilian-food-dish-lunch-executive.jpg",
            disponivel: true,
            produto: [
                {
                    id: 1,
                    nome: "Prato especial",
                    descricao: "Especial da casa! Acompanha... Especial da casa! Acompanha...",
                    foto: "https://http2.mlstatic.com/D_NQ_NP_984716-MLU74556662341_022024-O.webp",
                    valor: 25.99,
                    disponivel: true
                }
            ],
        },
        {
            id: 1,
            nome: "Comida",
            foto: "https://st4.depositphotos.com/7578900/39879/i/450/depositphotos_398795566-stock-photo-brazilian-food-dish-lunch-executive.jpg",
            disponivel: true,
            produto: [],
        }
    ]);

    const [produtos, setProdutos] = useState<Array<Produto>>(categorias[0].produto);

    const [categoriaAtual, setCategoriaAtual] = useState<Categoria>(categorias[0]);

    function setInfoProdutos(categoria: Categoria) {
        setCategoriaAtual(categoria);
        setProdutos(categoria.produto);
    }

    // const { usuario, handleLogout } = useContext(LoginContext);

    const [carregando, setCarregando] = useState<boolean>(false);

    const [isDeletar, setIsDeletar] = useState<boolean>(false);

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
            {carregando ? (
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
                <>
                    {props.isCardapio ? (
                        <>
                            <div className="flex flex-col gap-3 mt-4 ml-4 mr-4">
                                {categorias.map((categoria) => (
                                    <div onClick={() => {setProdutos(categoria.produto); setCategoriaAtual(categoria)}}>
                                        <CardCategoria categoria={categoria} isMesa={props.isCardapio} />
                                    </div>
                                ))}
                            </div> 

                            <div className="mt-4 mr-4 w-full">
                                <h2 className="text-zinc-700 text-2xl font-bold ">{categoriaAtual.nome}</h2>

                                {produtos.map((produto) => (
                                    <CardProduto produto={produto} />
                                ))}
                            </div>
                        </>
                              
                    ) : (
                        <div className="py-24 mx-auto w-2/3 grid grid-cols-2 justify-items-center xsm:grid-cols-1 sm:grid-cols-2 2md:grid-cols-3 xl:grid-cols-4">
                            {categorias.map((categoria) => (
                                <>
                                    <CardCategoria categoria={categoria} isMesa={props.isCardapio} />
                                </>
                            ))}
                        </div>
                    )}
                </>
            )}
        </>
    );
}

export default ListaCategoria;