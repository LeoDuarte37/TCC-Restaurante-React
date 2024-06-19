import ListaMesa from "../../components/mesa/lista/ListaMesa";
import { LoginContext } from "../../contexts/LoginContext";
import { useContext, useEffect, useState } from "react";
import "./MesaPage.css";
import { useNavigate } from "react-router-dom";
import toastAlert from "../../utils/toastAlert";
import { buscarMesas } from "../../services/Service";
import Mesa from "../../models/mesa/Mesa";
import ModalFormMesa from "../../components/mesa/modal/ModalFormMesa";

function MesaPage() {

    const { login, handleLogout } = useContext(LoginContext);

    const navigate = useNavigate();

    const [mesas, setMesas] = useState<Array<Mesa>>([] as Mesa[]);

    async function getMesas() {
        if (login.perfil === "GARCOM") {
            try {
                await buscarMesas(`/mesa/listar/chamandoGarcom/restaurante/${login.restauranteId}`,
                    setMesas,
                    {
                        headers: {
                            Authorization: `Bearer ${login.token}`,
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
                    `/mesa/listar/restaurante/${login.restauranteId}`,
                    setMesas,
                    {
                        headers: {
                            Authorization: `Bearer ${login.token}`,
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

    useEffect(() => {
        getMesas();
    }, []);

    useEffect(() => {
        if (login.token === '') {
            toastAlert('Você precisa logar novamente', 'info');
            navigate('/');
        }
    }, [login.token]);

    return (
        <>
            {(login.perfil !== "") &&
                <div className="bg-[#F8F8F8] w-full h-full max-w-6xl flex flex-col mx-auto mt-4 items-center px-4 pb-4 my-2 max-[768px]:px-2 max-[768px]:pb-2">
                    <div className="flex justify-between items-center h-full max-h-10 w-full">
                        <h1 className="text-[#D42300] w-full subCategoriaTitle text-center text-3xl font-bold max-[1600px]:mt-4">
                            Mesas
                        </h1>

                        {(login.perfil === "ROOT" || login.perfil === "ADMIN") && <ModalFormMesa getMesas={getMesas} />}
                    </div>
                    <div className="bg-[#F8F8F8] w-full h-full max-h-[75%] max-w-6xl flex flex-col justify-center items-center">
                        <ListaMesa mesas={mesas} getMesas={getMesas} />
                    </div>
                </div>
            }
        </>
    );
}

export default MesaPage;