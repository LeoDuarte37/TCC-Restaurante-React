import { useState, useContext } from "react";
import { Menu, Transition, MenuItems, MenuItem, MenuButton } from "@headlessui/react";
import { Link, useNavigate } from "react-router-dom";
import { LoginContext } from "../../../contexts/LoginContext";

function MenuHamburguer() {

    const { handleLogout } = useContext(LoginContext);

    const navigate = useNavigate();

    function logout() {
        handleLogout();
        navigate('/');
    }

    const [isOpen, setIsOpen] = useState<boolean>(false);

    return (
        <Menu>
            <MenuButton className="py-2" onClick={() => setIsOpen(!isOpen)}>
                <div className="menu">
                    <div className={isOpen ? "bar1-active" : "bar1"}></div>
                    <div className={isOpen ? "bar2-active" : "bar2"}></div>
                    <div className={isOpen ? "bar3-active" : "bar3"}></div>
                </div>
            </MenuButton>
            <Transition show={isOpen}
                enter="transition ease-out duration-75"
                enterFrom="opacity-0 scale-95"
                enterTo="opacity-100 scale-100"
                leave="transition ease-in duration-100"
                leaveFrom="opacity-100 scale-100"
                leaveTo="opacity-0 scale-95"
            >
                <MenuItems
                    anchor="bottom end"
                    className="flex flex-col w-40 h-40 mt-2 origin-top-right rounded-xl border-2 border-[#3B1206] bg-[#F8F8F8] p-1 text-sm/6 text-white focus:outline-none"
                >
                    <MenuItem>
                        <Link to="/mesas" className="h-full mb-2 group flex w-full justify-center items-center gap-2 rounded-lg py-1.5 px-3 font-semibold text-sm bg-[#3B1206]">
                            <p onClick={() => setIsOpen(false)} className="text-[#F8F8F8]">
                                Mesas chamando
                            </p>
                        </Link>
                    </MenuItem>
                    <MenuItem>
                        <Link to="/historico/pedidos" className="h-full group flex w-full justify-center items-center gap-2 rounded-lg py-1.5 px-3 font-semibold text-sm bg-[#3B1206]">
                            <p onClick={() => setIsOpen(false)} className="text-[#F8F8F8]">
                                Pedidos prontos
                            </p>
                        </Link>
                    </MenuItem>
                    <MenuItem>
                        <div className="h-0.5 w-full bg-[#3B1206] my-2 rounded-xl"></div>
                    </MenuItem>
                    <MenuItem>
                        <p onClick={logout} className="h-full max-h-10 group flex w-full justify-center items-center gap-2 rounded-lg py-1.5 px-3 font-semibold text-sm bg-red-500">
                            Sair
                        </p>
                    </MenuItem>
                </MenuItems>
            </Transition>
        </Menu>
    )
}

export default MenuHamburguer;