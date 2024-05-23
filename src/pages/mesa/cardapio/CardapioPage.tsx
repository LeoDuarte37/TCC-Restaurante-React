import ListaCategoria from "../../../components/categoria/lista/ListaCategoria";
import Cardapio from "../../../components/mesa/cardapio/Cardapio";
import Destaques from "../../../components/mesa/destaques/Destaques";
import "./CardapioPage.css"

function CardapioPage() {
    return (
        <div className="flex cardapioPage">
            <div className="sidebar">
                <div className="produto">
                    <Destaques />
                    <hr />
                    <Cardapio />
                </div>

                <div className="sobre">
                    <p>Sobre</p>
                </div>
            </div>
            <ListaCategoria isCardapio={true}/>
        </div>
    );
}

export default CardapioPage;