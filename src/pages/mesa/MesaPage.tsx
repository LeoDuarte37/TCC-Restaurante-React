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
                <div className="bg-[#F8F8F8] w-full h-full flex flex-col gap-3 items-center px-4 pb-4 my-2 max-[768px]:px-2 max-[768px]:pb-2">
                    <h1 className="text-[#D42300] subCategoriaTitle text-3xl font-bold mt-4 max-[1600px]:mt-4">
                        Mesas
                    </h1>
                    <div className="bg-[#F8F8F8] w-full h-full max-h-[75%] flex flex-col justify-center items-center">

                        <ListaMesa />
                    </div>
                </div>
            }
        </>
    );
}

export default MesaPage;