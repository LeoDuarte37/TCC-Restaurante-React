
import ListaCategoria from "../../../components/categoria/lista/ListaCategoria";
import Sidebar from "../../../components/sidebar/Sidebar";

function CardapioPage() {
    return (
        <div className="flex h-full">
            <Sidebar />
            <ListaCategoria />
        </div>
    );
}

export default CardapioPage;