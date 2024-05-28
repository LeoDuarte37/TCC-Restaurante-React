import Produto from "../../../models/Produto";

function CardProduto(props : { produto: Produto; isMesa?: boolean }) {
    return (
        <li key={props.produto.id} className="relative flex flex-row bg-clip-border rounded-xl bg-white text-gray-700 shadow-md w-full h-30">
            <div
                className="relative max-w-40 m-0 overflow-hidden text-gray-700 bg-white rounded-r-none bg-clip-border rounded-xl shrink-0">
                <img
                    src={props.produto.foto}
                    alt="card-image" className="object-cover w-full h-full" />
            </div>
            <div className="px-4 py-2 w-full h-full flex flex-col gap-2">
                <div className="flex justify-between w-full">
                    <h4 className="block font-sans text-lg antialiased font-bold leading-snug tracking-normal text-blue-gray-900">
                        {props.produto.nome}
                    </h4>
                    
                    <p>{props.produto.valor}</p>
                </div>
                <p className="block font-sans text-base leading-5 antialiased font-normal text-gray-700">
                    {props.produto.descricao}
                </p>

                <div className="flex justify-end items-end h-full">
                    <button className="bg-blue-500 hover:bg-blue-700 text-white font-semibold py-1 px-2 rounded h-8">Adicionar</button>
                </div>
            </div>
        </li>
    )
}

export default CardProduto;