import Mesa from "../../../models/mesa/Mesa";
import CardMesa from "../card/CardMesa";

function ListaMesa(props: { mesas: Array<Mesa>; getMesas: Function}) {

    function renderMesas() {
        return props.mesas.map((mesa) => (
            <li key={mesa.id}>
                <CardMesa mesa={mesa} getInfo={props.getMesas} />
            </li>
        ));
    }

    return (
        <ul className="flex w-full h-full m-4 p-4 max-[690px]:p-2 border-2 border-[#3B1206] rounded-lg">
            { renderMesas() }
        </ul>
    );
}

export default ListaMesa;