import ListaMesa from "../../components/mesa/lista/ListaMesa";
import { LoginContext } from "../../contexts/LoginContext";
import { useContext, useEffect } from "react";
import "./MesaPage.css";
import { useNavigate } from "react-router-dom";
import toastAlert from "../../utils/toastAlert";

function MesaPage() {

    const { login } = useContext(LoginContext);

    const navigate = useNavigate(); 

    useEffect(() => {
		if (login.token === '') {
			toastAlert('Você precisa logar novamente', 'info');
			navigate('/');
		}
	}, [login.token]);

    return (
        <>
            {(login.perfil === "CAIXA" || login.perfil === "ADMIN" || login.perfil === "ROOT") &&
                <ListaMesa />
            }
        </>
    );
}

export default MesaPage;