import { useContext, useEffect, useState } from "react";
import Mesa from "../../../models/Mesa";
import CardMesa from "../card/CardMesa";
import { LoginContext } from "../../../contexts/LoginContext";
import { buscarMesasPorRestaurante, listarChamandoGarcom } from "../../../services/Service";
import toastAlert from "../../../utils/toastAlert";
import useMesa from "../../../hooks/useMesa";

function ListaMesa() {

    const { usuario, handleLogout } = useContext(LoginContext);

    const { mesas } = useMesa();

    const [ listMesas, setListMesas ] = useState<Array<Mesa>>([]);

    function getMesas() {
        setListMesas(mesas);
    }

    // async function getMesas() {
    //     if (usuario.perfil === "GARCOM") {
    //         try {
    //             await listarChamandoGarcom(setMesas, {
    //                 headers: {
    //                     Authorization: usuario.token,
    //                 },
    //             });
                
    //         } catch (error: any) {
    //             if (error.toString().includes("403")) {
    //                 toastAlert("Faça login novamente!", "info");
    //                 handleLogout();
    //             }   
    //         }
    //     } else {
    //         try {
    //             await buscarMesasPorRestaurante(
    //                 usuario.restaurante.id, 
    //                 setMesas,
    //                 {
    //                     headers: { 
    //                         Authorization: usuario.token,
    //                     },
    //                 },   
    //             )
    //         } catch (error: any) {
    //             if (error.toString().includes("403")) {
    //                 toastAlert("Faça login novamente!", "info");
    //                 handleLogout();
    //             }   
    //         }
    //     }
    // }

    function renderMesas() {
        return listMesas.map((mesa) => (
            <li key={mesa.id}>
                { mesa.restaurante.id == usuario.restaurante.id &&
                    <CardMesa mesa={mesa} getInfo={getMesas} />
                }
            </li>
        ));
    }

    useEffect(() => {
        getMesas();
    }, [mesas]);

    // useEffect(() => {
    //     handleLogout();
    // }, [usuario.token]);

    return (
        <ul>
            { renderMesas() }
        </ul>
    );
}

export default ListaMesa;