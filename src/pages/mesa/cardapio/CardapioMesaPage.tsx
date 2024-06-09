
import ListaCategoria from "../../../components/categoria/lista/ListaCategoria";
import Sidebar from "../../../components/sidebar/Sidebar";

function CardapioPage() {
    return (
        <div className="flex h-full bg-[#f8f8f8]">
            <Sidebar />
            <div className="bg-[#3B1206] w-1 h-full"></div>
            <ListaCategoria />
        </div>
    );
}

export default CardapioPage;