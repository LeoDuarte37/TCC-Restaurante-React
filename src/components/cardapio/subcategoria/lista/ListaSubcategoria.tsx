import Subcategoria from "../../../../models/SubCategoria";
import CardSubcategoria from "../card/CardSubcategoria";

function ListaSubcategoria(props: {subcategorias: Array<Subcategoria>; setInfo: Function}) {
    return (
        <ul className="group flex flex-col w-full items-center gap-3 rounded-lg data-[focus]:bg-white/10">
            {props.subcategorias.map((subCategoria) => (
                <li key={subCategoria.id} onClick={() => props.setInfo(subCategoria)}>
                    <CardSubcategoria subCategoria={subCategoria} />
                </li>
            ))}
        </ul>
    )
}

export default ListaSubcategoria;