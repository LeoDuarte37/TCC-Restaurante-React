function FormSubcategoria() {

    return (
        <form action="" className="p-4 flex flex-col gap-4 text-[#3B1206] text-lg font-bold">
            <fieldset>    
                <label htmlFor="nome">
                    Nome da categoria:
                </label>
                <input value=""
                    type="text"
                    name="nome"
                    className='mt-3 block w-full rounded-lg border-2 border-[#D42300] bg-[#f8f8f8] py-1.5 px-3 text-sm/6 text-gray focus:outline-none focus:outline-1 focus:ring-[#D42300] focus:-outline-offset-0 focus:outline-' />
            </fieldset>

            <fieldset>
                <label htmlFor="disponivel">Disponivel:</label>
                <input checked={true}
                    type="checkbox" 
                    name="disponivel"
                    className="size-6 ml-2 rounded-lg border-2  border-[#D42300] checked:outline-[#D42300] focus:outline-[#D42300] checked:bg-[#D42300]"/>
            </fieldset>

            <button className="button h-14 text-center flex items-center justify-center  self-center mt-3">
                Adicionar Subcategoria
            </button>
        </form>
    );
}

export default FormSubcategoria;