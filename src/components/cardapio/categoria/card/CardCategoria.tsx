import { CaretDown } from "@phosphor-icons/react";
import Categoria from "../../../../models/categoria/Categoria";

function CardCategoria(props: { categoria: Categoria }) {

    return (
        <button className="w-full h-10 inline-flex justify-center items-center w-full gap-1 rounded-md bg-[#3B1206] text-sm/6 font-semibold text-[#f8f8f8] shadow-inner shadow-white/10 focus:outline-none data-[hover]:bg-[#522213] data-[open]:bg-[#522213] data-[focus]:outline-1 data-[focus]:outline-white">
            {props.categoria.nome}
            <CaretDown size={18} color="white" />
        </button>
    );
}

export default CardCategoria;