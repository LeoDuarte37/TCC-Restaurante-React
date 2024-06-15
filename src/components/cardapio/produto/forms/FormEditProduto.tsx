import { ChangeEvent, useState } from "react";
import Produto from "../../../../models/produto/Produto";

function FormEditProduto(props: {produto: Produto}) {
    const [produto, setProduto] = useState<Produto>(props.produto);

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

    return (
        <form action="" className="p-4 flex flex-col gap-3 text-[#3B1206] text-lg font-bold">
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
                        className="block h-full max-h-10 w-full rounded-lg border-2  border-[#D42300] checked:outline-[#D42300] focus:outline-[#D42300] checked:bg-[#D42300]"/>
                </div>
            </fieldset>

            <fieldset>
                <label htmlFor="descricao">Descrição:</label>
                <textarea value={produto.descricao}
                    name="descricao"
                    onChange={(e: ChangeEvent<HTMLTextAreaElement>) => atualizarDescricao(e)} 
                    className="block w-full h-16 max-h-16 rounded-lg border-2 border-[#D42300]"/>
            </fieldset>

            <fieldset>
                <label htmlFor="valor">Foto:</label>
                <input value={produto.foto} 
                    type="text" 
                    name="foto" 
                    onChange={(e: ChangeEvent<HTMLInputElement>) => atualizarEstado(e)} 
                    className="block w-full rounded-lg border-2  border-[#D42300] checked:outline-[#D42300] focus:outline-[#D42300] checked:bg-[#D42300]"/>
            </fieldset>

            <fieldset>
                <label htmlFor="disponivel">Disponivel:</label>
                <input checked={produto.disponivel}
                    type="checkbox" 
                    name="disponivel"
                    onChange={(e: ChangeEvent<HTMLInputElement>) => atualizarEstado(e)} 
                    className="size-6 ml-2 rounded-lg border-2  border-[#D42300] checked:outline-[#D42300] focus:outline-[#D42300] checked:bg-[#D42300]"/>
            </fieldset>

            <button className="button h-14 text-center flex items-center justify-center self-center mt-3">
                Editar Produto
            </button>
        </form>
    );
}

export default FormEditProduto;