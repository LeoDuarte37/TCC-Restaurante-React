import ListaCategoria from "../../../components/categoria/lista/ListaCategoria";
import Sidebar from "../../../components/mesa/sidebar/Sidebar";

function CardapioPage() {
    return (
        <div className="flex h-full">
            <Sidebar />
            <ListaCategoria isCardapio={true}/>
        </div>
    );
}

export default CardapioPage;