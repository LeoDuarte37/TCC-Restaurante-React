import { ChangeEvent, useContext, useState } from "react";
import AddCategoria from "../../../../models/categoria/AddCategoria";
import { LoginContext } from "../../../../contexts/LoginContext";
import { adicionar } from "../../../../services/Service";
import { useNavigate } from "react-router-dom";
import toastAlert from "../../../../utils/toastAlert";

function FormCategoria() {

    const { login } = useContext(LoginContext);

    const navigate = useNavigate();

    const [addCategoria, setAddCategoria] = useState<AddCategoria>({
        nome: "",
        disponivel: false,
        restauranteId: login.restauranteId
    });

    function atualizarEstado(e: ChangeEvent<HTMLInputElement>) {
        const target = e.target;
        const value = target.type === 'checkbox' ? target.checked : target.value;
        const name = target.name;

        setAddCategoria({
            ...addCategoria,
            [name]: value,
        });
    }

    async function submit(e: ChangeEvent<HTMLFormElement>) {
        e.preventDefault();

        try {
            await adicionar(`/categoria`, addCategoria, {
                headers: {
                    Authorization: `Bearer ${login.token}`,
                },
            });

            toastAlert("Nova categoria adicionada!", "sucesso");
            
            navigate("/historico/pedidos");
            
        } catch (error: any) {
            console.log(error) 
            console.log(login)   
        }
    }

    return (
        <form onSubmit={submit} className="h-full p-4 flex flex-col text-[#3B1206] text-lg font-bold">
            <div className="flex flex-col gap-3">
                <fieldset>
                    <label htmlFor="nome">Nome da categoria:</label>
                    <input type="text"
                        name="nome"
                        required
                        onChange={(e: ChangeEvent<HTMLInputElement>) => atualizarEstado(e)}
                        className='mt-4 block w-full rounded-lg border-2 border-[#D42300] bg-[#f8f8f8] py-1.5 px-3 text-sm/6 text-gray focus:outline-none focus:outline-1 focus:ring-[#D42300] focus:-outline-offset-0 focus:outline-' />
                </fieldset>
                <fieldset>
                    <label htmlFor="disponivel">Disponivel:</label>
                    <input type="checkbox"
                        name="disponivel"
                        required
                        onChange={(e: ChangeEvent<HTMLInputElement>) => atualizarEstado(e)}
                        className="size-6 ml-2 rounded-lg border-2 border-[#D42300] checked:outline-[#D42300] focus:outline-[#D42300] checked:bg-[#D42300]" />
                </fieldset>
            </div>

            <div className="h-full w-full flex justify-center">
                <input 
                    type="submit" 
                    placeholder="Adicionar Categoria"
                    className="button h-12 w-full text-center flex items-center justify-center self-center mt-3" />
            </div>
        </form>
    )
}

export default FormCategoria;