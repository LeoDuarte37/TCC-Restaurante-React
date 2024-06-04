import { CallBell } from "@phosphor-icons/react";
import useMesa from "../../../hooks/useMesa";
import { MesaContext } from "../../../contexts/MesaContext";
import { useContext } from "react";

function ChamarGarcomButton() {

    const { mesa, atualizarMesa } = useContext(MesaContext);
    const { chamarGarcom } = useMesa();

    return (
        <div className="chamarGarcom" onClick={() => chamarGarcom(mesa.id, true, atualizarMesa)}>
            <CallBell size={32} color="white" />
            <p>Chamar Garçom</p>
        </div>
    );
}

export default ChamarGarcomButton;