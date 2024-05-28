import { useEffect, useState } from "react";
import Categoria from "../../../models/Categoria";
import { buscarCardapio } from "../../../services/Service";
import toastAlert from "../../../utils/toastAlert";
import { TailSpin } from 'react-loader-spinner';
import CardCategoria from "../card/CardCategoria";
import Produto from "../../../models/Produto";
import CardProduto from "../../produto/card/CardProduto";
import SubCategoria from "../../../models/SubCategoria";

function ListaCategoria(props: { isMesa: boolean; }) {

    const [categorias, setCategorias] = useState<Array<Categoria>>([
        {
            id: 1,
            nome: "Comidas",
            subCategoria: [
                {
                    id: 2,
                    nome: "Pratos especiais",
                    produto: [
                        {
                            id: 3,
                            nome: "Prato especial",
                            descricao: "Especial da casa! Acompanha... Especial da casa! Acompanha...",
                            foto: "https://http2.mlstatic.com/D_NQ_NP_984716-MLU74556662341_022024-O.webp",
                            valor: 25.99,
                            disponivel: true
                        },
                        {
                            id: 4,
                            nome: "Prato especial",
                            descricao: "Especial da casa! Acompanha... Especial da casa! Acompanha...",
                            foto: "https://http2.mlstatic.com/D_NQ_NP_984716-MLU74556662341_022024-O.webp",
                            valor: 25.99,
                            disponivel: true
                        },
                        {
                            id: 5,
                            nome: "Prato especial",
                            descricao: "Especial da casa! Acompanha... Especial da casa! Acompanha...",
                            foto: "https://http2.mlstatic.com/D_NQ_NP_984716-MLU74556662341_022024-O.webp",
                            valor: 25.99,
                            disponivel: true
                        },
                        {
                            id: 6,
                            nome: "Prato especial",
                            descricao: "Especial da casa! Acompanha... Especial da casa! Acompanha...",
                            foto: "https://http2.mlstatic.com/D_NQ_NP_984716-MLU74556662341_022024-O.webp",
                            valor: 25.99,
                            disponivel: true
                        },
                    ],
                    disponivel: true,
                },
                {
                    id: 7,
                    nome: "Lanches",
                    produto: [
                        {
                            id: 8,
                            nome: "Prato especial",
                            descricao: "Especial da casa! Acompanha... Especial da casa! Acompanha...",
                            foto: "https://http2.mlstatic.com/D_NQ_NP_984716-MLU74556662341_022024-O.webp",
                            valor: 25.99,
                            disponivel: true
                        },
                        {
                            id: 9,
                            nome: "Prato especial",
                            descricao: "Especial da casa! Acompanha... Especial da casa! Acompanha...",
                            foto: "https://http2.mlstatic.com/D_NQ_NP_984716-MLU74556662341_022024-O.webp",
                            valor: 25.99,
                            disponivel: true
                        },
                    ],
                    disponivel: true,
                },
            ],
            disponivel: true,
        },
    ]);

    const [produtos, setProdutos] = useState<Array<Produto>>(categorias[0].subCategoria[0].produto);

    const [subCategoriaAtual, setSubCategoriaAtual] = useState<SubCategoria>(categorias[0].subCategoria[0]);

    function setInfoProdutos(subCategoria: SubCategoria) {
        setSubCategoriaAtual(subCategoria);
        setProdutos(subCategoria.produto);
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
                    {props.isMesa ? (
                        <>
                            <div className="flex flex-col gap-3 ml-4 mt-4 pb-4 pr-4 w-40 h-4/5 overflow-y-scroll">
                                {categorias.map((categoria) => (
                                    <ul>
                                        <li key={categoria.id}>
                                            <h2 className="text-zinc-700 text-center text-2xl font-bold">{categoria.nome}</h2>
                                            <div className="bg-gray-800 w-full h-0.5"></div>
                                        </li>

                                        <ul>
                                            {categoria.subCategoria.map((subCategoria) => (
                                                <li key={subCategoria.id} onClick={() => { setProdutos(subCategoria.produto); setSubCategoriaAtual(subCategoria) }}>
                                                    <CardCategoria subCategoria={subCategoria} isMesa={props.isMesa} />
                                                </li>
                                            ))}
                                        </ul>
                                    </ul>
                                ))}
                            </div>

                            <div className="bg-gray-800 w-1 h-full"></div>

                            <div className="flex flex-col m-4 w-full h-full">
                                <h2 className="text-zinc-700 text-2xl font-bold mb-4 ">{subCategoriaAtual.nome}</h2>

                                <ul className="flex flex-col gap-6 w-full h-3/4 pb-4 overflow-auto">
                                    {produtos.map((produto) => (
                                        <CardProduto produto={produto} />
                                    ))}
                                </ul>
                            </div>
                        </>

                    ) : (
                        <div className="py-24 mx-auto w-2/3 grid grid-cols-2 justify-items-center xsm:grid-cols-1 sm:grid-cols-2 2md:grid-cols-3 xl:grid-cols-4">
                            {categorias.map((categoria) => (
                                <>
                                    {/* <CardCategoria subCategoria={categoria} isMesa={props.isMesa} /> */}
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