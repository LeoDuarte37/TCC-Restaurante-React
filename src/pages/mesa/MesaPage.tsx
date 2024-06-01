import ListaMesa from "../../components/mesa/lista/ListaMesa";
import { LoginContext } from "../../contexts/LoginContext";
import { useContext } from "react";
import "./MesaPage.css";

function MesaPage() {

    const { usuario } = useContext(LoginContext);

    return (
        <ListaMesa page={usuario.perfil} />
    )
}

export default MesaPage;