import CardapioButton from "../buttons/CardapioButton";
// import DestaquesButton from "../buttons/DestaquesButton";
import "./Sidebar.css";

function Sidebar() {
    return (
        <div className="sidebar">
            <div className="produto">
                <CardapioButton />
            </div>

            <div className="sobre">
                <p>Sobre</p>
            </div>
        </div>
    );
}

export default Sidebar;