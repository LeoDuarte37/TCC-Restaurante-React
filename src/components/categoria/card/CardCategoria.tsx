import SubCategoria from "../../../models/SubCategoria";

function CardCategoria(props: { subCategoria: SubCategoria }) {

    return (
        <article key={props.subCategoria.id} className="relative isolate flex flex-col items-center justify-center rounded-xl mb-2 h-full w-full max-h-8">
            <h1 className="z-10 text-lg leading-4 text-center font-semibold">
                {props.subCategoria.nome}
            </h1>
        </article>
    );
}

export default CardCategoria;