
import { useContext, useEffect} from "react";
import ListaCategoria from "../../../components/cardapio/categoria/lista/ListaCategoria";
import Sidebar from "../../../components/sidebar/Sidebar";
import { MesaContext } from "../../../contexts/MesaContext";
import { TailSpin } from "react-loader-spinner";
import { CardapioContext } from "../../../contexts/CardapioContext";

function CardapioPage() {
    const { mesa, } = useContext(MesaContext);
    const { categorias, isLoading, buscarCategorias, setSubCategoriaAtual } = useContext(CardapioContext);

    useEffect(() => {
        buscarCategorias();
        setSubCategoriaAtual(categorias[0]?.subcategoria[0]);
    }, []);

    return (
        <>
            {mesa.id > 0 &&
                <div className="flex h-full bg-[#f8f8f8]">
                    <Sidebar />
                    <div className="bg-[#3B1206] w-1 h-full"></div>
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
                    ) : <ListaCategoria />}
                </div>
            }
        </>
    );
}

export default CardapioPage;