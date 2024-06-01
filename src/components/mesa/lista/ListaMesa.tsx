import { useEffect, useState } from "react";
import Mesa from "../../../models/Mesa";
import CardMesa from "../card/CardMesa";
import useMesa from "../../../hooks/useMesa";

function ListaMesa(props: {page: string}) {

    const { isModified } = useMesa();
    const [mesas, setMesas] = useState<Array<Mesa>>([]);

    const [isLoading, setIsLoading] = useState<boolean>(false);

    function getMesas() {
        setIsLoading(true);

        const search = JSON.parse(localStorage.getItem("mesa") || "[]");

        setMesas(search);
        setIsLoading(false);
    }

    function renderMesas() {
        return mesas.map((mesa) => (
            <li key={mesa.id}>
                <CardMesa mesa={mesa} />
            </li>
        ))
    }

    useEffect(() => {
        getMesas();
    }, [isModified]);

    return (
        <ul>
            { isLoading ? <></> : renderMesas() }
        </ul>
    );
}

export default ListaMesa;