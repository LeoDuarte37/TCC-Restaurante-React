import { useState, ChangeEvent, useContext } from "react";
import Categoria from "../../../../models/categoria/Categoria";
import AddSubcategoria from "../../../../models/subcategoria/AddSubcategoria";
import { adicionar } from "../../../../services/Service";
import { useNavigate } from "react-router-dom";
import { LoginContext } from "../../../../contexts/LoginContext";
import toastAlert from "../../../../utils/toastAlert";

function FormSubcategoria(props: { categoria: Categoria }) {

    const navigate = useNavigate();
    
    const { login } = useContext(LoginContext);

    const [addSubcategoria, setAddSubcategoria] = useState<AddSubcategoria>({
        nome: "",
        disponivel: false,
        categoriaId: props.categoria.id,
    })

    function atualizarEstado(e: ChangeEvent<HTMLInputElement>) {
        const target = e.target;
        const value = target.type === 'checkbox' ? target.checked : target.value;
        const name = target.name;

        setAddSubcategoria({
            ...addSubcategoria,
            [name]: value,
        })
    }

    async function submit(e: ChangeEvent<HTMLFormElement>) {
        e.preventDefault();

        try {
            await adicionar(`/subcategoria`, addSubcategoria, {
                headers: {
                    Authorization: `Bearer ${login.token}`,
                },
            });
            
            toastAlert("Nova subcategoria adicionada!", "sucesso");
            navigate("/cardapio");
            
        } catch (error: any) {
            toastAlert("Erro ao adicionar nova subcategoria. Por favor, tente novamente.", "erro")
            console.log(error)   
        }
    }

    return (
        <form onSubmit={submit} className="h-full p-4 flex flex-col justify-between text-[#3B1206] text-lg font-bold">
            <div className="flex flex-col gap-3">
                <fieldset>
                    <label htmlFor="nome">
                        Nome da subcategoria:
                    </label>
                    <input
                        type="text"
                        name="nome"
                        required
                        onChange={(e: ChangeEvent<HTMLInputElement>) => atualizarEstado(e)}
                        className='mt-3 block w-full rounded-lg border-2 border-[#D42300] bg-[#f8f8f8] py-1.5 px-3 text-sm/6 text-gray focus:outline-none focus:outline-1 focus:ring-[#D42300] focus:-outline-offset-0 focus:outline-' />
                </fieldset>
                <fieldset>
                    <label htmlFor="disponivel">Disponivel:</label>
                    <input
                        type="checkbox"
                        name="disponivel"
                        required
                        onChange={(e: ChangeEvent<HTMLInputElement>) => atualizarEstado(e)}
                        className="size-6 ml-2 rounded-lg border-2  border-[#D42300] checked:outline-[#D42300] focus:outline-[#D42300] checked:bg-[#D42300]" />
                </fieldset>
            </div>

            <div className="h-full w-full flex justify-center">
                <input 
                    type="submit" 
                    placeholder="Adicionar Subcategoria"
                    className="button h-14 w-full text-center self-center mt-3" />
            </div>
        </form>
    );
}

export default FormSubcategoria;