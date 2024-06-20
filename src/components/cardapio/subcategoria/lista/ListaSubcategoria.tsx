import { useState, useContext } from "react";
import Subcategoria from "../../../../models/subcategoria/Subcategoria";
import CardSubcategoria from "../card/CardSubcategoria";
import { CardapioContext } from "../../../../contexts/CardapioContext";

function ListaSubcategoria(props: {subcategorias: Array<Subcategoria> }) {

    const { setSubCategoriaAtual } = useContext(CardapioContext);

    const [subcategorias, setSubcategorias] = useState<Array<Subcategoria>>(props.subcategorias);

    return (
        <ul className="group flex flex-col w-full items-center gap-3 rounded-lg data-[focus]:bg-white/10">
            {subcategorias && subcategorias.map((subCategoria) => (
                <li key={subCategoria.id} onClick={() => setSubCategoriaAtual(subCategoria)}>
                    <CardSubcategoria subCategoria={subCategoria} />
                </li>
            ))}
        </ul>
    )
}

export default ListaSubcategoria;