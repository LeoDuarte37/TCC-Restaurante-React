import { useEffect, useState, useContext } from "react";
import Categoria from "../../../models/Categoria";
import { buscarCardapio } from "../../../services/Service";
import { TailSpin } from 'react-loader-spinner';
import CardCategoria from "../card/CardCategoria";
import Produto from "../../../models/Produto";
import CardProduto from "../../produto/card/CardProduto";
import SubCategoria from "../../../models/SubCategoria";
import { MesaContext } from "../../../contexts/MesaContext";
import { Menu, MenuButton, Transition, MenuItems, MenuItem } from "@headlessui/react";
import { CaretCircleDown } from "@phosphor-icons/react";

function ListaCategoria() {

    const { mesa } = useContext(MesaContext);

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
    ]);

    const [produtos, setProdutos] = useState<Array<Produto>>(categorias[0].subCategoria[0].produto);

    const [subCategoriaAtual, setSubCategoriaAtual] = useState<SubCategoria>(categorias[0].subCategoria[0]);

    function setInfoProdutos(subCategoria: SubCategoria) {
        setSubCategoriaAtual(subCategoria);
        setProdutos(subCategoria.produto);
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
                    {mesa.id > 0 ? (
                        <>
                            <ul className="flex flex-col gap-3 w-40 m-4 h-4/5 overflow-y-scroll">
                                {categorias.map((categoria) => (
                                    <li key={categoria.id}>
                                        <Menu>
                                            <MenuButton className="inline-flex items-center w-full gap-2 rounded-md bg-gray-800 py-1.5 px-3 text-sm/6 font-semibold text-white shadow-inner shadow-white/10 focus:outline-none data-[hover]:bg-gray-700 data-[open]:bg-gray-700 data-[focus]:outline-1 data-[focus]:outline-white">
                                                {categoria.nome}
                                                <CaretCircleDown size={20} color="white" />
                                            </MenuButton>
                                            <Transition
                                                enter="transition ease-out duration-75"
                                                enterFrom="opacity-0 scale-95"
                                                enterTo="opacity-100 scale-100"
                                                leave="transition ease-in duration-100"
                                                leaveFrom="opacity-100 scale-100"
                                                leaveTo="opacity-0 scale-95"
                                            >
                                                <MenuItems
                                                    anchor="bottom"
                                                    className="w-28 mt-2 origin-top-right rounded-xl border border-white/5 bg-white/5 p-1 text-sm/6 text-white [--anchor-gap:var(--spacing-1)] focus:outline-none"
                                                >
                                                    <MenuItem>
                                                        <ul className="group flex flex-col w-full items-center gap-2 rounded-lg py-1.5 px-3 data-[focus]:bg-white/10">
                                                            {categoria.subCategoria.map((subCategoria) => (
                                                                <li key={subCategoria.id} onClick={() => setInfoProdutos(subCategoria)}>
                                                                    <CardCategoria subCategoria={subCategoria} mesaId={mesa.id} />
                                                                </li>
                                                            ))}
                                                        </ul>
                                                    </MenuItem>
                                                </MenuItems>
                                            </Transition>
                                        </Menu>
                                    </li>
                                ))}
                            </ul>

                            <div className="bg-gray-800 w-1 h-full"></div>

                            <div className="flex flex-col m-4 w-full h-full">
                                <h2 className="text-zinc-700 text-2xl font-bold mb-4 ">{subCategoriaAtual.nome}</h2>

                                <ul className="flex flex-col gap-6 w-full h-3/4 pb-4 overflow-auto">
                                    {produtos.map((produto) => (
                                        <li key={produto.id}>
                                            <CardProduto produto={produto} />
                                        </li>
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