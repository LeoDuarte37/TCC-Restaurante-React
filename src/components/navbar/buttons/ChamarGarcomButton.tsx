import { CallBell } from "@phosphor-icons/react";
import useMesa from "../../../hooks/useMesa";
import { MesaContext } from "../../../contexts/MesaContext";
import { useContext } from "react";

function ChamarGarcomButton() {

    const { mesa } = useContext(MesaContext);
    const { chamarGarcom } = useMesa();

    return (
        <div className="chamarGarcom" onClick={() => chamarGarcom(mesa.id)}>
            <CallBell size={32} color="#f8f8f8" />
            <p>Chamar Garçom</p>
        </div>
    );
}

export default ChamarGarcomButton;