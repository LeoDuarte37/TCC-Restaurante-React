import { CallBell } from "@phosphor-icons/react";
import useMesa from "../../../hooks/useMesa";

function ChamarGarcomButton() {

    const { chamarGarcom } = useMesa();

    return (
        <div className="chamarGarcom" onClick={ chamarGarcom }>
            <CallBell size={32} color="white" />
            <p>Chamar Garçom</p>
        </div>
    );
}

export default ChamarGarcomButton;