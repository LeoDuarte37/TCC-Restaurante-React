import { CallBell } from "@phosphor-icons/react";
import useMesa from "../../../hooks/useMesa";
import { MesaContext } from "../../../contexts/MesaContext";
import { useContext } from "react";

function ChamarGarcomButton() {

    const { mesa } = useContext(MesaContext);
    const { chamar } = useMesa();

    return (
        <div className="chamarGarcom" onClick={() => chamar(mesa)}>
            <CallBell size={32} color="white" />
            <p>Chamar Garçom</p>
        </div>
    );
}

export default ChamarGarcomButton;