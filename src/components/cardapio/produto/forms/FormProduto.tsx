import { ChangeEvent, useContext, useState } from "react";
import AddProduto from "../../../../models/produto/AddProduto";
import { useNavigate } from "react-router-dom";
import { LoginContext } from "../../../../contexts/LoginContext";
import { adicionar } from "../../../../services/Service";
import toastAlert from "../../../../utils/toastAlert";
import { CardapioContext } from "../../../../contexts/CardapioContext";

function FormProduto() {
    const { login, handleLogout } = useContext(LoginContext);
    const { subcategoriaAtual, buscarCategorias } = useContext(CardapioContext);

    const navigate = useNavigate();
    
    const [addProduto, setAddProduto] = useState<AddProduto>({
        nome: "",
        descricao: "",
        foto: "",
        valor: 0,
        disponivel: false,
        subcategoriaId: subcategoriaAtual.id,
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
        
        try {
            await adicionar(`/produto`, addProduto, {
                headers: {
                    Authorization: `Bearer ${login.token}`,
                },
            });
            
            toastAlert("Novo produto adicionado!", "sucesso");
            buscarCategorias();
            
        } catch (error: any) {
            if (error.toString().includes('403')) {
                toastAlert("Por favor, faça login novamente!", "info");
                handleLogout();
                navigate('/');
            } else {
                toastAlert("Erro ao adicionar novo produto. Por favor, tente novamente.", "erro")
            }
        }
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
                <input
                    type="submit" 
                    placeholder="Adicionar Produto"                    
                    className="button h-14 w-full text-center self-center mt-3" />
            </div>
        </form>
    );
}

export default FormProduto;