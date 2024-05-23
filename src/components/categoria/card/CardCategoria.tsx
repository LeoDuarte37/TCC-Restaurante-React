import Categoria from "../../../models/Categoria";

function CardCategoria(props: { categoria: Categoria, isMesa: boolean }) {

    {/*{props.categoria.foto}*/ }

    return (
        <>
            { props.isMesa ? (
                <article className="relative isolate flex flex-col justify-end overflow-hidden rounded-xl px-8 pb-4 pt-24 max-w-48 max-h-6">
                    <img src={props.categoria.foto} alt="Foto Categoria" className="absolute inset-0 h-full w-full object-cover"/>
                    <div className="absolute inset-0 bg-gradient-to-t from-stone-400 via-Stone-100/5"></div>
                    <h1 className="z-10 mt-3 text-2xl text-center font-bold text-white">{props.categoria.nome}</h1>
                </article>
            ) : (
                <article className="relative isolate flex flex-col justify-end overflow-hidden rounded-2xl px-8 pb-4 pt-24 max-w-48 max-h-6">
                    <img src={props.categoria.foto} alt="Foto Categoria" className="absolute inset-0 h-full w-full object-cover"/>
                    <div className="absolute inset-0 bg-gradient-to-t from-stone-400 via-Stone-100/5"></div>
                    <h1 className="z-10 mt-3 text-2xl text-center font-bold text-white">{props.categoria.nome}</h1>
                </article>
            )}
        </>
    );
}

export default CardCategoria;