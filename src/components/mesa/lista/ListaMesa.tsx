import { useContext, useEffect, useState } from "react";
import Mesa from "../../../models/Mesa";
import CardMesa from "../card/CardMesa";
import { LoginContext } from "../../../contexts/LoginContext";
import { buscarMesasPorRestaurante } from "../../../services/Service";
import toastAlert from "../../../utils/toastAlert";

function ListaMesa() {

    const { usuario, handleLogout } = useContext(LoginContext);

    const [ mesas, setMesas ] = useState<Array<Mesa>>([]);

    async function getMesas() {
        if (usuario.perfil === "GARCOM") {
            const mesasStorage: Array<Mesa> = JSON.parse(localStorage.getItem("mesa") || "[]");
            setMesas(mesasStorage); 
        } else {
            try {
                await buscarMesasPorRestaurante(
                    usuario.restaurante.id, 
                    setMesas,
                    {
                        headers: { 
                            Authorization: usuario.token,
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
    }, []);

    return (
        <ul>
            { renderMesas() }
        </ul>
    );
}

export default ListaMesa;