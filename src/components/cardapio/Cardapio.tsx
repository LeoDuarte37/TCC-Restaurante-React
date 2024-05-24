import ListaCardapio from "./lista/ListaCardapio";

function Cardapio(props: { isMesa: boolean }) {

    return (
        <div className="bg-white">
            <div>
                <main className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                    <ListaCardapio isMesa={props.isMesa} />

                    {!props.isMesa && (
                        <>
                            <button>
                                Remover categoria
                            </button>

                            <button>
                                Adicionar categoria
                            </button>
                        </>
                    )}
                </main>
            </div>
        </div>
    );
}

export default Cardapio;