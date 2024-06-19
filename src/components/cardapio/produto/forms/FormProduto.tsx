import { ChangeEvent, useContext, useState } from "react";
import Subcategoria from "../../../../models/subcategoria/Subcategoria";
import AddProduto from "../../../../models/produto/AddProduto";
import { useNavigate } from "react-router-dom";
import { LoginContext } from "../../../../contexts/LoginContext";
import { adicionar } from "../../../../services/Service";

function FormProduto(props: { subcategoria: Subcategoria }) {

    const navigate = useNavigate();
    
    const { login } = useContext(LoginContext);

    const [addProduto, setAddProduto] = useState<AddProduto>({
        nome: "",
        descricao: "",
        foto: "",
        valor: 0,
        disponivel: false,
        subCategoriaId: props.subcategoria.id,
    });

    function atualizarEstado(e: ChangeEvent<HTMLInputElement>) {
        const target = e.target;
        const value = target.type === 'checkbox' ? target.checked : target.value;
        const name = target.name;

        setAddProduto({
            ...addProduto,
            [name]: value,
        });
    }

    function atualizarDescricao(e: ChangeEvent<HTMLTextAreaElement>) {
        setAddProduto({
            ...addProduto,
            [e.target.name]: e.target.value,
        });
    }

    async function submit(e: ChangeEvent<HTMLFormElement>) {
        e.preventDefault();
        
        await adicionar(`/produto`, addProduto, {
            headers: {
                Authorization: `Bearer ${login.token}`,
            },
        });
        
        navigate("/produto");
    }

    return (
        <form onSubmit={submit} className="h-full p-4 flex flex-col text-[#3B1206] text-lg font-bold">
            <div className="flex flex-col gap-3">
                <fieldset className="flex gap-3 h-full">
                    <div className="w-full">
                        <label htmlFor="nome">
                            Nome do produto:
                        </label>
                        <input
                            type="text"
                            name="nome"
                            required
                            onChange={(e: ChangeEvent<HTMLInputElement>) => atualizarEstado(e)}
                            className='block h-full max-h-10 w-full rounded-lg border-2 border-[#D42300] bg-[#f8f8f8] py-1.5 px-3 text-sm/6 text-gray focus:outline-none focus:outline-1 focus:ring-[#D42300] focus:-outline-offset-0 focus:outline-' />
                    </div>
                    <div className="w-full">
                        <label htmlFor="valor">Valor:</label>
                        <input
                            type="number"
                            name="valor"
                            required
                            onChange={(e: ChangeEvent<HTMLInputElement>) => atualizarEstado(e)}
                            className="block h-full max-h-10 w-full rounded-lg border-2  border-[#D42300] checked:outline-[#D42300] focus:outline-[#D42300] checked:bg-[#D42300]" />
                    </div>
                </fieldset>

                <fieldset>
                    <label htmlFor="descricao">Descrição:</label>
                    <textarea
                        name="descricao"
                        required
                        onChange={(e: ChangeEvent<HTMLTextAreaElement>) => atualizarDescricao(e)}
                        className="block w-full h-16 max-h-16 rounded-lg border-2 border-[#D42300]" />
                </fieldset>

                <fieldset>
                    <label htmlFor="valor">Foto:</label>
                    <input
                        type="text"
                        name="foto"
                        required
                        onChange={(e: ChangeEvent<HTMLInputElement>) => atualizarEstado(e)}
                        className="block w-full rounded-lg border-2  border-[#D42300] checked:outline-[#D42300] focus:outline-[#D42300] checked:bg-[#D42300]" />
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
                <button type="submit" className="button h-12 w-full text-center flex items-center justify-center self-center mt-3">
                    Adicionar Produto
                </button>
            </div>
        </form>
    );
}

export default FormProduto;