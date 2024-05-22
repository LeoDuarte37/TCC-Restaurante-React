import Categoria from "../../../models/Categoria";

function CardCategoria(props: { categoria: Categoria }) {

    {/*{props.categoria.foto}*/ }

    return (
        <article className="relative isolate flex flex-col justify-end overflow-hidden rounded-2xl px-4 pb-4 pt-36 max-w-64 h-14">
            <img src="https://st4.depositphotos.com/7578900/39879/i/450/depositphotos_398795566-stock-photo-brazilian-food-dish-lunch-executive.jpg" alt="Foto Categoria" className="absolute inset-0 h-full w-full object-cover"/>
            <div className="absolute inset-0 bg-gradient-to-t from-stone-400 via-Stone-100/5"></div>
            <h1 className="z-10 mt-3 text-4xl font-bold text-white">Categoria</h1>
        </article>
    );
}

export default CardCategoria;