import { useContext, useEffect, useState } from "react";
import Mesa from "../../../models/mesa/Mesa";
import CardMesa from "../card/CardMesa";
import { LoginContext } from "../../../contexts/LoginContext";
import { buscarMesas } from "../../../services/Service";
import toastAlert from "../../../utils/toastAlert";

function ListaMesa() {

    const { login, handleLogout } = useContext(LoginContext);

    const [ mesas, setMesas ] = useState<Array<Mesa>>([]);

    async function getMesas() {
        if (login.perfil === "GARCOM") {
            try {
                await buscarMesas(
                    `/listar/chamandoGarcom/restaurante/${login.restauranteId}`, 
                    setMesas, 
                    {
                        headers: {
                            Authorization: login.token,
                        },
                    }
                );
                
            } catch (error: any) {
                if (error.toString().includes("403")) {
                    toastAlert("Faça login novamente!", "info");
                    handleLogout();
                }   
            }
        } else {
            try {
                await buscarMesas(
                    `/listar/restaurante/${login.restauranteId}`,
                    setMesas,
                    {
                        headers: { 
                            Authorization: login.token,
                        },
                    },   
                )
            } catch (error: any) {
                if (error.toString().includes("403")) {
                    toastAlert("Faça login novamente!", "info");
                    handleLogout();
                }   
            }
        }
    }

    function renderMesas() {
        return mesas.map((mesa) => (
            <li key={mesa.id}>
                <CardMesa mesa={mesa} getInfo={getMesas} />
            </li>
        ));
    }

    useEffect(() => {
        getMesas();
    }, [mesas]);


    return (
        <ul className="flex w-full h-full m-4 p-4 max-[690px]:p-2 border-2 border-[#3B1206] rounded-lg">
            { renderMesas() }
        </ul>
    );
}

export default ListaMesa;