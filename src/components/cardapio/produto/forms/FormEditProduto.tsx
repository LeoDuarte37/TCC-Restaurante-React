import { ChangeEvent, useContext, useState } from "react";
import Produto from "../../../../models/produto/Produto";
import { LoginContext } from "../../../../contexts/LoginContext";
import { editar } from "../../../../services/Service";
import toastAlert from "../../../../utils/toastAlert";
import AtualizarProduto from "../../../../models/produto/AtualizarProduto";
import { CardapioContext } from "../../../../contexts/CardapioContext";
import { useNavigate } from "react-router-dom";

function FormEditProduto(props: { produto: Produto, setOpen: Function }) {

    const { login, handleLogout } = useContext(LoginContext);
    const { subcategoriaAtual, buscarCategorias } = useContext(CardapioContext); 

    const navigate = useNavigate();

    const [produto, setProduto] = useState<AtualizarProduto>({
        id: props.produto.id,
        nome: props.produto.nome,
        descricao: props.produto.descricao,
        foto: props.produto.foto,
        valor: props.produto.valor,
        disponivel: props.produto.disponivel,
        subcategoria: {
            id: subcategoriaAtual.id,
        },
    });

    function atualizarEstado(e: ChangeEvent<HTMLInputElement>) {
        const target = e.target;
        const value = target.type === 'checkbox' ? target.checked : target.value;
        const name = target.name;

        setProduto({
            ...produto,
            [name]: value,
        });
    }

    function atualizarDescricao(e: ChangeEvent<HTMLTextAreaElement>) {
        setProduto({
            ...produto,
            [e.target.name]: e.target.value,
        });
    }

    async function submit(e: ChangeEvent<HTMLFormElement>) {
        e.preventDefault();

        try {
            await editar(`/produto`, produto, setProduto, {
                headers: {
                    Authorization: `Bearer ${login.token}`,
                },
            });
            
            toastAlert("Produto editado!", "sucesso");
            props.setOpen(false);
            buscarCategorias();
            
        } catch (error: any) {
            if (error.toString().includes('403')) {
                toastAlert("Por favor, faça login novamente!", "info");
                handleLogout();
                navigate('/');
            } else {
                toastAlert("Não foi possivel editar o produto! Por favor, tente novamente.", "erro");
            }
        }
    }

    return (
        <>
            <form onSubmit={submit} className="h-full p-4 flex flex-col text-[#3B1206] text-lg font-bold">
                <div className="flex flex-col gap-3">
                    <fieldset className="flex gap-3 h-full">
                        <div className="w-full">
                            <label htmlFor="nome">
                                Nome do produto:
                            </label>
                            <input value={produto.nome}
                                type="text"
                                name="nome"
                                onChange={(e: ChangeEvent<HTMLInputElement>) => atualizarEstado(e)}
                                className='block h-full max-h-10 w-full rounded-lg border-2 border-[#D42300] bg-[#f8f8f8] py-1.5 px-3 text-sm/6 text-gray focus:outline-none focus:outline-1 focus:ring-[#D42300] focus:-outline-offset-0 focus:outline-' />
                        </div>
                        <div className="w-full">
                            <label htmlFor="valor">Valor:</label>
                            <input value={produto.valor}
                                type="number"
                                name="valor"
                                onChange={(e: ChangeEvent<HTMLInputElement>) => atualizarEstado(e)}
                                className="block h-full max-h-10 w-full rounded-lg border-2  border-[#D42300] checked:outline-[#D42300] focus:outline-[#D42300] checked:bg-[#D42300]" />
                        </div>
                    </fieldset>
                    <fieldset>
                        <label htmlFor="descricao">Descrição:</label>
                        <textarea value={produto.descricao}
                            name="descricao"
                            onChange={(e: ChangeEvent<HTMLTextAreaElement>) => atualizarDescricao(e)}
                            className="block w-full h-16 max-h-16 rounded-lg border-2 border-[#D42300]" />
                    </fieldset>
                    <fieldset>
                        <label htmlFor="valor">Foto:</label>
                        <input value={produto.foto}
                            type="text"
                            name="foto"
                            onChange={(e: ChangeEvent<HTMLInputElement>) => atualizarEstado(e)}
                            className="block w-full rounded-lg border-2  border-[#D42300] checked:outline-[#D42300] focus:outline-[#D42300] checked:bg-[#D42300]" />
                    </fieldset>
                    <fieldset>
                        <label htmlFor="disponivel">Disponivel:</label>
                        <input checked={produto.disponivel}
                            type="checkbox"
                            name="disponivel"
                            onChange={(e: ChangeEvent<HTMLInputElement>) => atualizarEstado(e)}
                            className="size-6 ml-2 rounded-lg border-2  border-[#D42300] checked:outline-[#D42300] focus:outline-[#D42300] checked:bg-[#D42300]" />
                    </fieldset>
                </div>

                <div className="h-full w-full flex justify-center gap-3">
                    <input 
                        type="submit" 
                        placeholder="Editar Produto"
                        className="button h-12 w-full text-center flex items-center justify-center self-center mt-3"/>
                </div>
            </form>
        </>
    );
}

export default FormEditProduto;