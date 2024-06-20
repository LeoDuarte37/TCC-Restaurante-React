import { ChangeEvent, useContext, useState } from "react";
import Categoria from "../../../../models/categoria/Categoria";
import { editar } from "../../../../services/Service";
import { LoginContext } from "../../../../contexts/LoginContext";
import { useNavigate } from "react-router-dom";
import toastAlert from "../../../../utils/toastAlert";
import { CardapioContext } from "../../../../contexts/CardapioContext";

function FormEditCategoria(props: { categoriaModal: Categoria }) {

    const { login, handleLogout } = useContext(LoginContext);
    const { buscarCategorias } = useContext(CardapioContext);

    const navigate = useNavigate();

    const [categoria, setCategoria] = useState<Categoria>(props.categoriaModal);

    function atualizarEstado(e: ChangeEvent<HTMLInputElement>) {
        const target = e.target;
        const value = target.type === 'checkbox' ? target.checked : target.value;
        const name = target.name;

        setCategoria({
            ...categoria,
            [name]: value,
        });
    }

    async function submit(e: ChangeEvent<HTMLFormElement>) {
        e.preventDefault();

        try {
            await editar(`/categoria`, categoria, setCategoria, {
                headers: {
                    Authorization: `Bearer ${login.token}`,
                },
            });
            
            toastAlert("Categoria atualizada!", "sucesso");
            buscarCategorias();

        } catch (error: any) {
            if (error.toString().includes('403')) {
                toastAlert("Por favor, faça login novamente!", "info");
                handleLogout();
                navigate('/');
            } else {
                toastAlert("Não foi possivel editar a categoria! Por favor, tente novamente.", "info");
            }
        }
    }

    return (
        <>
            <form onSubmit={submit} className="h-full p-4 flex flex-col text-[#3B1206] text-lg font-bold">
                <div className="flex flex-col gap-3">
                    <fieldset>
                        <label htmlFor="nome">
                            Nome da categoria:
                        </label>
                        <input value={categoria.nome}
                            type="text"
                            name="nome"
                            onChange={(e: ChangeEvent<HTMLInputElement>) => atualizarEstado(e)}
                            className='mt-4 block w-full rounded-lg border-2 border-[#D42300] bg-[#f8f8f8] py-1.5 px-3 text-sm/6 text-gray focus:outline-none focus:outline-1 focus:ring-[#D42300] focus:-outline-offset-0 focus:outline-' />
                    </fieldset>

                    <fieldset>
                        <label htmlFor="disponivel">Disponivel:</label>
                        <input checked={categoria.disponivel}
                            type="checkbox"
                            name="disponivel"
                            onChange={(e: ChangeEvent<HTMLInputElement>) => atualizarEstado(e)}
                            className="size-6 ml-2 rounded-lg border-2  border-[#D42300] checked:outline-[#D42300] focus:outline-[#D42300] checked:bg-[#D42300]" />
                    </fieldset>
                </div>

                <div className="h-full w-full flex justify-center gap-3">
                    <button type="submit" className="button h-12 w-full text-center flex items-center justify-center self-center mt-3">
                        Editar Categoria
                    </button>
                </div>
            </form>
        </>
    );
}

export default FormEditCategoria;