import Cardapio from "../../../components/cardapio/Cardapio";
import Sidebar from "../../../components/mesa/sidebar/Sidebar";

function CardapioPage() {
    return (
        <div className="flex h-full">
            <Sidebar />
            <Cardapio isMesa={true}/>
        </div>
    );
}

export default CardapioPage;