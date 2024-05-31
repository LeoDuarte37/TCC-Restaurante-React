import Sidebar from "../../../components/mesa/sidebar/Sidebar";
import ListaPedido from "../../../components/pedido/lista/ListaPedido";
import "./ContaMesaPage.css"

function ContaMesaPage() {
    return (
        <div className="flex h-full">
            <Sidebar />

            <div className="flex flex-col items-center gap-8 mt-10 w-full h-full">
                <h1 className="text-gray-800 font-bold text-3xl">Pedidos realizados</h1>
                <ListaPedido page="ContaMesa"/>
                <button className="button">Fechar conta</button>
            </div>
        </div>
    )
}

export default ContaMesaPage;