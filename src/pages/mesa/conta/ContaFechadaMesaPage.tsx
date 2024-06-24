import { useContext } from "react";
import { MesaContext } from "../../../contexts/MesaContext";
import usePedido from "../../../hooks/usePedido";
import { useNavigate } from "react-router-dom";

export default function ContaFechadaMesaPage() {

    const { mesa } = useContext(MesaContext);
    const { clearConta, clearPedido } = usePedido();
    const navigate = useNavigate();

    function retornar() {
        clearConta();
        clearPedido();
        navigate("/mesa/cardapio");
    }

    return (
        <div className="flex justify-center items-center w-full h-full">
            <div className="flex flex-col justify-around items-center h-80">
                <div className="flex flex-col w-full items-center">
                    <div className="caixaTitle">
                        <h1>
                            Obrigado!
                        </h1>
                    </div>
                </div>

                <div className="flex flex-col justify-center gap-4 h-44 w-80 text-center">
                    <div className="bg-[#F5EBDC] p-2 rounded-md">
                        <h3 className="text-2xl text-[#3B1206]">
                            Por gentileza, comunique o caixa sobre a
                            mesa {mesa.numero}.
                        </h3>
                    </div>
                    <button className="button" onClick={retornar}>
                        OK
                    </button>
                </div>
            </div>
        </div>
    )
}