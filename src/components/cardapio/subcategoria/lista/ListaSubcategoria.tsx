import { useState } from "react";
import Subcategoria from "../../../../models/subcategoria/Subcategoria";
import CardSubcategoria from "../card/CardSubcategoria";

function ListaSubcategoria(props: {subcategorias: Array<Subcategoria>; setInfo: Function}) {

    const [subcategorias, setSubcategorias] = useState<Array<Subcategoria>>(props.subcategorias);

    return (
        <ul className="group flex flex-col w-full items-center gap-3 rounded-lg data-[focus]:bg-white/10">
            {subcategorias?.map((subCategoria) => (
                <li key={subCategoria.id} onClick={() => props.setInfo(subCategoria)}>
                    <CardSubcategoria subCategoria={subCategoria} />
                </li>
            ))}
        </ul>
    )
}

export default ListaSubcategoria;