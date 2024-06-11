import { useState } from "react";
import { Menu, Transition, MenuItems, MenuItem, MenuButton } from "@headlessui/react";


function MenuHamburguer() {

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
                    className="flex flex-col w-40 h-40 mt-2 origin-top-right rounded-xl border border-white/5 bg-gray-700 p-1 text-sm/6 text-white focus:outline-none"
                >
                    <MenuItem>
                        <p className="h-full mb-2 group flex w-full items-center gap-2 rounded-lg py-1.5 px-3 font-semibold text-sm bg-white/10 ">
                            Mesas chamando
                        </p>
                    </MenuItem>
                    <MenuItem>
                        <p className="h-full group flex w-full items-center gap-2 rounded-lg py-1.5 px-3 font-semibold text-sm bg-white/10">
                            Pedidos prontos
                        </p>
                    </MenuItem>
                    <MenuItem>
                        <div className="h-0.5 w-full bg-gray-200 my-2 rounded-xl"></div>
                    </MenuItem>
                    <MenuItem>
                        <p className="h-full group flex w-full items-center gap-2 rounded-lg py-1.5 px-3 font-semibold text-sm bg-red-500">
                            Sair
                        </p>
                    </MenuItem>
                </MenuItems>
            </Transition>
        </Menu>
    )
}

export default MenuHamburguer;