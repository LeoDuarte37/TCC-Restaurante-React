import { useContext, useState } from "react";
import { MesaContext } from "../../../contexts/MesaContext";

function SearchButton() {

    const { mesa, handleMesaLogout } = useContext(MesaContext);
    const [ check, setCheck ] = useState<boolean>(false);

    return (
        <div className="search">
            <div className="identification">
                <p>Mesa {mesa.numero}</p>
            </div>

            <form className="max-w-md mx-auto">
                <div className="relative">
                    <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
                        <svg className={check == false ? "w-4 h-4 text-[#3B1206]" : "w-4 h-4 text-[#D42300]"} aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                            <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z" />
                        </svg>
                    </div>
                    <input type="search" id="default-search" onChange={() => setCheck(!check)} className="block w-full h-4 p-4 ps-10 text-sm text-[#3B1206] bg-[#f8f8f8] border border-gray-300 rounded-lg bg-gray-50 focus:ring-[#D42300] focus:border-[#D42300]" placeholder="Comidas específicas..." required />
                </div>
            </form>
        </div>
    );
}

export default SearchButton;