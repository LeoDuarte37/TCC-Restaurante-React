import Sidebar from "../../../components/mesa/sidebar/Sidebar";
import ListaPedido from "../../../components/pedido/lista/ListaPedido";


function ContaMesaPage() {
    return (
        <div className="flex h-full">
            <Sidebar />

            <div className="flex justify-center items-center w-full">
                <ListaPedido page="ContaMesa"/>
            </div>
        </div>
    )
}

export default ContaMesaPage;