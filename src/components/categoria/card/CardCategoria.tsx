import SubCategoria from "../../../models/SubCategoria";

function CardCategoria(props: { subCategoria: SubCategoria, isMesa: boolean }) {

    return (
        <>
            { props.isMesa ? (
                <article className="relative isolate flex flex-col items-center justify-center overflow-hidden rounded-xl p-4 h-full max-w-48 max-h-12 bg-gradient-to-t from-stone-400 via-Stone-100/5">
                    <h1 className="z-10 text-sm leading-4 text-center font-semibold text-gray-800">{props.subCategoria.nome}</h1>
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