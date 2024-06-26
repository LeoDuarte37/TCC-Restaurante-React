import { useState, useContext, useEffect } from "react";
import Subcategoria from "../../../../models/subcategoria/Subcategoria";
import CardSubcategoria from "../card/CardSubcategoria";
import { CardapioContext } from "../../../../contexts/CardapioContext";
import { LoginContext } from "../../../../contexts/LoginContext";

function ListaSubcategoria(props: { subcategorias: Array<Subcategoria> }) {

    const { login } = useContext(LoginContext);
    const { setSubCategoriaAtual } = useContext(CardapioContext);

    const [subcategorias, setSubcategorias] = useState<Array<Subcategoria>>(props.subcategorias);

    return (
        <ul className="group flex flex-col w-full items-center gap-3 rounded-lg data-[focus]:bg-white/10">
            {subcategorias && subcategorias.map((subCategoria) => (
                <>
                    {login.token != '' ?
                        <li key={subCategoria.id} onClick={() => setSubCategoriaAtual(subCategoria)}>
                            <CardSubcategoria subCategoria={subCategoria} />
                        </li>

                        : <>
                            {(subCategoria.disponivel == true && subCategoria.produto.length > 0) &&
                                <li key={subCategoria.id} onClick={() => setSubCategoriaAtual(subCategoria)}>
                                    <CardSubcategoria subCategoria={subCategoria} />
                                </li>
                            }
                        </>
                    }
                </>
            ))}
        </ul>
    );
}

export default ListaSubcategoria;