import { Sidebar } from "@phosphor-icons/react";
import Destaque from "../../../components/destaque/slide/SlideDestaque";

function DestaquePage() {
    return (
        <div className="flex h-full">
            <Sidebar />
            <Destaque />
        </div>
    );
}

export default DestaquePage;