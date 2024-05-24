import { useState } from "react";
import Produto from "../../../models/Produto";
import Categoria from "../../../models/Categoria";
import { TailSpin } from "react-loader-spinner";
import CardProduto from "../../produto/card/CardProduto";
import {
    Menu,
    MenuButton,
    MenuItem,
    MenuItems,
    Transition,
} from '@headlessui/react';

import { CaretDown } from '@phosphor-icons/react';


function ListaCardapio(props : {isMesa: boolean}) {

    const [categorias, setCategorias] = useState<Array<Categoria>>([
        {
            id: 1,
            nome: "Comida",
            disponivel: true,
            produto: [
                {
                    id: 1,
                    nome: "Prato especial",
                    descricao: "Especial da casa! Acompanha... Especial da casa! Acompanha... Especial da casa! Acompanha... asdas asdasdas",
                    foto: "https://http2.mlstatic.com/D_NQ_NP_984716-MLU74556662341_022024-O.webp",
                    valor: 25.99,
                    disponivel: true
                }
            ],
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
                    <div className="flex items-baseline justify-between border-b border-gray-200 pb-6 pt-6">
                        <h1 className="text-4xl font-bold tracking-tight text-gray-900">{categoriaAtual.nome}</h1>

                        <div className="flex items-center">
                            <Menu as="div" className="relative inline-block text-left">
                                <div>
                                    <MenuButton className="group inline-flex justify-center text-sm font-medium text-gray-700 hover:text-gray-900">
                                        Categorias
                                        <CaretDown size={32} 
                                            className="-mr-1 ml-1 h-5 w-5 flex-shrink-0 text-gray-400 group-hover:text-gray-500"
                                            aria-hidden="true"
                                        />
                                    </MenuButton>
                                </div>

                                <Transition
                                    enter="transition ease-out duration-100"
                                    enterFrom="transform opacity-0 scale-95"
                                    enterTo="transform opacity-100 scale-100"
                                    leave="transition ease-in duration-75"
                                    leaveFrom="transform opacity-100 scale-100"
                                    leaveTo="transform opacity-0 scale-95"
                                >
                                    <MenuItems className="absolute right-0 z-10 mt-2 w-40 origin-top-right rounded-md bg-white shadow-2xl ring-1 ring-black ring-opacity-5 focus:outline-none">
                                        <div className="py-1">
                                            {categorias.map((categoria) => (
                                                <MenuItem key={categoria.nome}>       
                                                    <p className="font-medium text-gray-900 block px-4 py-2 text-sm">
                                                        {categoria.nome}
                                                    </p>                                               
                                                </MenuItem>
                                            ))}
                                        </div>
                                    </MenuItems>
                                </Transition>
                            </Menu>
                        </div>
                    </div>

                    <section aria-labelledby="products-heading" className="pb-6 pt-6">
                        <h2 id="products-heading" className="sr-only">
                            Products
                        </h2>

                        <div className="grid grid-cols-1 gap-x-8 gap-y-10 lg:grid-cols-4">
                            { produtos.map((produto) => (
                                <div className="lg:col-span-3">
                                    <CardProduto produto={produto}/>
                                </div>
                            ))}
                        </div>
                    </section>

                    {/* <div className="p-4 flex flex-row">
                        <div className="flex flex-col gap-3 ">
                            {categorias.map((categoria) => (
                                <div onClick={() => {setProdutos(categoria.produto); setCategoriaAtual(categoria)}}>
                                    <CardCategoria categoria={categoria} />
                                </div>
                            ))}
                        </div> 

                        <div className="flex flex-col mr-4 ml-4 w-1xl max-w-3xl">
                            <h2 className="text-zinc-700 text-2xl font-bold ">{categoriaAtual.nome}</h2>

                            {produtos.map((produto) => (
                                <CardProduto produto={produto} />
                            ))}
                        </div>
                    </div> */}
                </>
            )}
        </>
    );
}

export default ListaCardapio;