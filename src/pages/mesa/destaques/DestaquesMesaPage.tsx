
import CarouselDestaque from "../../../components/destaque/carousel/CarouselDestaque";
import Sidebar from "../../../components/sidebar/Sidebar";

function DestaquePage() {
    return (
        <div className="flex h-full">
            <Sidebar />
            <CarouselDestaque />
        </div>
    );
}

export default DestaquePage;