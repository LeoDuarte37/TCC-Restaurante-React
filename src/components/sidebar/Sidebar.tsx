import CardapioButton from "../mesa/buttons/CardapioButton";
// import DestaquesButton from "../buttons/DestaquesButton";
import "./Sidebar.css";

function Sidebar() {
    return (
        <div className="sidebar">
            <div className="produto">
                <hr />
                <CardapioButton />
                <hr />
            </div>

            <div className="sobre">
                <p>Sobre</p>
            </div>
        </div>
    );
}

export default Sidebar;