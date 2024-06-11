import { useEffect, useState, useContext } from "react";
import Categoria from "../../../../models/Categoria";
import { TailSpin } from 'react-loader-spinner';
import CardCategoria from "../card/CardCategoria";
import SubCategoria from "../../../../models/Subcategoria";
import { MesaContext } from "../../../../contexts/MesaContext";
import { Disclosure, DisclosureButton, DisclosurePanel } from "@headlessui/react";
import { LoginContext } from "../../../../contexts/LoginContext";
import ListaSubcategoria from "../../subcategoria/lista/ListaSubcategoria";
import ListaProduto from "../../produto/lista/ListaProduto";

function ListaCategoria() {

    const { mesa } = useContext(MesaContext);
    const { usuario } = useContext(LoginContext);

    const [categorias, setCategorias] = useState<Array<Categoria>>([
        {
            id: 1,
            nome: "Comidas",
            subCategoria: [
                {
                    id: 1,
                    nome: "Pratos especiais",
                    produto: [
                        {
                            id: 1,
                            nome: "Prato especial",
                            descricao: "Especial da casa! Acompanha... Especial da casa! Acompanha...",
                            foto: "https://http2.mlstatic.com/D_NQ_NP_984716-MLU74556662341_022024-O.webp",
                            valor: 25.99,
                            disponivel: true
                        },
                        {
                            id: 2,
                            nome: "Prato",
                            descricao: "Especial da casa! Acompanha... Especial da casa! Acompanha...",
                            foto: "https://http2.mlstatic.com/D_NQ_NP_984716-MLU74556662341_022024-O.webp",
                            valor: 25.99,
                            disponivel: true
                        },
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
                    ],
                    disponivel: true,
                },
                {
                    id: 2,
                    nome: "Lanches",
                    produto: [
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
            ],
            disponivel: true,
        },
        {
            id: 2,
            nome: "Bebidas",
            subCategoria: [
                {
                    id: 1,
                    nome: "Refrigerantes",
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
                    disponivel: true,
                },
                {
                    id: 1,
                    nome: "Alcoolicos",
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
                    disponivel: true,
                },
            ],
            disponivel: true,
        },
        {
            id: 3,
            nome: "Sobremesas",
            subCategoria: [
                {
                    id: 1,
                    nome: "Sorvetes",
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
                    disponivel: true,
                },
            ],
            disponivel: true,
        },
    ]);

    const [subCategoriaAtual, setSubCategoriaAtual] = useState<SubCategoria>(categorias[0].subCategoria[0]);

    function setInfoProdutos(subCategoria: SubCategoria) {
        setSubCategoriaAtual(subCategoria);
    }

    // const { usuario, handleLogout } = useContext(LoginContext);

    const [isLoading, setIsLoading] = useState<boolean>(false);

    // const [isDeletar, setIsDeletar] = useState<boolean>(false);

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
            ) : (
                <>
                    <ul className="flex flex-col gap-4 max-w-44 w-full p-4 h-4/5 overflow-auto">
                        {categorias.map((categoria) => (
                            <li key={categoria.id}>
                                <div className="w-full">
                                    <div className="mx-auto w-full max-w-lg divide-y divide-white/5 rounded-xl bg-white/5">
                                        <Disclosure as="div" className="" defaultOpen={true}>
                                            <DisclosureButton className="group flex w-full items-center gap-2 justify-between">
                                                <div className="flex border border-[#3B1206] rounded-lg w-full">
                                                    <CardCategoria categoria={categoria} />
                                                </div>
                                            </DisclosureButton>
                                            <DisclosurePanel className="mt-4 text-md text-[#3B1206]">
                                                <ListaSubcategoria subcategorias={categoria.subCategoria} setInfo={setInfoProdutos}/>
                                            </DisclosurePanel>
                                        </Disclosure>
                                    </div>
                                </div>
                            </li>
                        ))}
                        {usuario.perfil === "ADMIN" &&
                            <li key={"NovaCategoria"} className="bg-[#D42300] hover:bg-[#b51f02] mb-4 text-white text-center font-semibold py-1 px-2 rounded h-8">
                                Nova categoria
                            </li>
                        }
                    </ul>

                    <div className="bg-[#3B1206] w-1 h-full"></div>

                    <div className="flex flex-col p-4 w-full h-full bg-[#f8f8f8] max-w-[50%] max-[1000px]:max-w-full">
                        <ListaProduto subcategoria={subCategoriaAtual}/>
                    </div>
                </>
            )}
        </>
    );
}

export default ListaCategoria;