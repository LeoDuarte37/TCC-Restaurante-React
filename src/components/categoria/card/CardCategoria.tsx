import SubCategoria from "../../../models/SubCategoria";

function CardCategoria(props: { subCategoria: SubCategoria; mesaId: number }) {

    return (
        <>
            { props.mesaId > 0 ? (
                <article key={props.subCategoria.id} className="relative isolate flex flex-col items-center justify-center overflow-hidden rounded-xl p-4 mb-2 h-full w-full max-h-8">
                    <h1 className="z-10 text-sm leading-4 text-center font-semibold">{props.subCategoria.nome}</h1>
                </article>
            ) : (
                <article className="relative isolate flex flex-col items-center justify-center overflow-hidden rounded-xl p-4 h-16 max-w-48 max-h-6 bg-gradient-to-t from-stone-400 via-Stone-100/5">
                    <h1 className="z-10 text-xl text-center font-bold text-white">{props.subCategoria.nome}</h1>
                </article>
            )}
        </>
    );
}

export default CardCategoria;