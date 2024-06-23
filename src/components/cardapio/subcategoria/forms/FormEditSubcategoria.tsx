import { ChangeEvent, useContext, useState } from "react";
import { CardapioContext } from "../../../../contexts/CardapioContext";
import { editar } from "../../../../services/Service";
import AtualizarCardapio from "../../../../models/AtualizarCardapio";
import toastAlert from "../../../../utils/toastAlert";
import { LoginContext } from "../../../../contexts/LoginContext";
import { useNavigate } from "react-router-dom";

function FormEditSubcategoria(props: { setOpen: Function }) {

    const { login, handleLogout } = useContext(LoginContext);
    const { subcategoriaAtual, buscarCategorias } = useContext(CardapioContext);

    const navigate = useNavigate();

    const [subcategoria, setSubcategoria] = useState<AtualizarCardapio>({
        id: subcategoriaAtual.id,
        nome: subcategoriaAtual.nome,
        disponivel: subcategoriaAtual.disponivel,
    });

    function atualizarEstado(e: ChangeEvent<HTMLInputElement>) {
        const target = e.target;
        const value = target.type === 'checkbox' ? target.checked : target.value;
        const name = target.name;

        setSubcategoria({
            ...subcategoria,
            [name]: value,
        });
    }

    async function submit(e: ChangeEvent<HTMLFormElement>) {
        e.preventDefault();

        try {
            await editar(`/subcategoria`, subcategoria, setSubcategoria, {
                headers: {
                    Authorization: `Bearer ${login.token}`,
                },
            });

            toastAlert("Subcategoria editada!", "sucesso");
            props.setOpen(false);
            buscarCategorias();

        } catch (error: any) {
            if (error.toString().includes('403')) {
                toastAlert("Por favor, faça login novamente!", "info");
                handleLogout();
                navigate('/');
            } else {
                toastAlert("Não foi possivel editar a subcategoria! Por favor, tente novamente.", "erro");
            }
        }
    }

    return (
        <>
            <form onSubmit={submit} className="h-full p-4 flex flex-col text-[#3B1206] text-lg font-bold">
                <div className="flex flex-col gap-3">
                    <fieldset>
                        <label htmlFor="nome">
                            Nome da subcategoria:
                        </label>
                        <input value={subcategoria.nome}
                            type="text"
                            name="nome"
                            onChange={(e: ChangeEvent<HTMLInputElement>) => atualizarEstado(e)}
                            className='mt-3 block w-full rounded-lg border-2 border-[#D42300] bg-[#f8f8f8] py-1.5 px-3 text-sm/6 text-gray focus:outline-none focus:outline-1 focus:ring-[#D42300] focus:-outline-offset-0 focus:outline-' />
                    </fieldset>
                    <fieldset>
                        <label htmlFor="disponivel">Disponivel:</label>
                        <input checked={subcategoria.disponivel}
                            type="checkbox"
                            name="disponivel"
                            onChange={(e: ChangeEvent<HTMLInputElement>) => atualizarEstado(e)}
                            className="size-6 ml-2 rounded-lg border-2  border-[#D42300] checked:outline-[#D42300] focus:outline-[#D42300] checked:bg-[#D42300]" />
                    </fieldset>
                </div>

                <div className="h-full w-full flex justify-center items-center gap-3">
                    <input 
                        type="submit" 
                        className="button p-0 h-12 w-full flex mt-3"/>
                </div>
            </form>
        </>
    );
}

export default FormEditSubcategoria;



