import "./Navbar.css";
import { ChefHat } from "@phosphor-icons/react";

function Navbar() {

    return (
        <nav>
            <div className="navbar">
                <div className="logo">
                    <ChefHat size={45} color='white' />
                </div>

                <div className="search">
                    <div className="identification">
                         <p>Mesa {/* {mesa.numero} */}</p> 
                    </div>

                </div>
            </div>

            <div className="sidebar">

            </div>
        </nav>
    );
}

export default Navbar;