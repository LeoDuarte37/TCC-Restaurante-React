import { useContext } from "react";
import { LoginContext } from "../../../../contexts/LoginContext";
import Subcategoria from "../../../../models/Subcategoria";
import CardProduto from "../card/CardProduto";

function ListaProduto(props: { subcategoria: Subcategoria }) {

    const { usuario } = useContext(LoginContext);

    return (
        <>
            <div className="flex justify-between items-center">
                <h2 className="text-[#D42300] text-start mb-4 subCategoriaTitle">{props.subcategoria.nome}</h2>

                {usuario.perfil === "ADMIN" &&
                    <button onClick={() => ("")} className="bg-[#D42300] hover:bg-[#b51f02] mb-3 text-white font-semibold py-1 px-2 rounded h-8">
                        Editar subcategoria
                    </button>
                }
            </div>

            <ul className="flex flex-col gap-6 w-full h-3/4 pb-4 overflow-auto">
                {props.subcategoria.produto.map((produto) => (
                    <li key={produto.id}>
                        <CardProduto produto={produto} />
                    </li>
                ))}
            </ul>
        </>
    )
}

export default ListaProduto;