import { ChangeEvent, useState } from "react";
import Categoria from "../../../../models/categoria/Categoria";

function FormEditCategoria(props: { categoriaModal: Categoria }) {

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
                    <button className="button h-14 w-full text-center flex items-center justify-center self-center mt-3">
                        Editar Categoria
                    </button>
                </div>
            </form>
        </>
    );
}

export default FormEditCategoria;