import ListaCategoria from "../../components/cardapio/categoria/lista/ListaCategoria";


export default function CardapioPage() {
    return (
        <div className="flex justify-center w-full h-full bg-[#f8f8f8]">
            
            {/* <div className="bg-[#3B1206] w-1 h-full"></div> */}
            <ListaCategoria />
        </div>
    )
}