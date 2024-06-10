import { useContext, useState } from "react";
import { LoginContext } from "../../../../contexts/LoginContext";
import Item from "../../../../models/Item";
import { MenuButton, Menu, MenuItem, MenuItems, Transition } from "@headlessui/react";
import { CaretCircleDown } from "@phosphor-icons/react";

function CardItemPedido(props: { item: Item }) {

    const { usuario } = useContext(LoginContext);

    const [ isOpen, setIsOpen ] = useState<boolean>(false);
    const [ largura, setLargura ] = useState<number>(window.innerWidth);

    const body = document.querySelector("body");
    addEventListener("resize", () => setLargura(window.innerWidth));

    return (
        <>
            <th scope="row" className="flex justify-center items-center w-full h-12 p-0 font-medium whitespace-nowrap text-center min-[320px]:text-wrap max-[425px]:h-14">
                <p className="max-[425px]:w-14">
                    {props.item.produto.nome}
                </p>
            </th>
            <td className="flex justify-center items-center w-full h-12 p-0 text-center max-[425px]:h-14">
                <p>
                    {props.item.quantidade}
                </p>
            </td>
            {(usuario.perfil === "COZINHA" || usuario.perfil === "GARCOM") ? <></> :
                <td className="flex justify-center items-center w-full h-12 p-0 text-center max-[425px]:h-14">
                    <p>
                        R$ {props.item.produto.valor}
                    </p>
                </td>
            }
            <td className="flex justify-center items-center w-full h-12 p-0 text-center max-[425px]:h-14">
                { props.item.observacao && 
                    <Menu>
                        <MenuButton onClick={() => setIsOpen(!isOpen)} className="inline-flex auto items-center gap-2 min-[320px]:text-[14px] rounded-md bg-[#3B1206] py-1.5 px-3 text-sm/6 font-semibold text-white shadow-inner shadow-white/10 focus:outline-none data-[hover]:bg-[#522213] data-[open]:bg-[#522213] data-[focus]:outline-1 data-[focus]:outline-white">
                            { largura > 640 ? "Visualizar" : "Ver" }
                            <CaretCircleDown size={20} color="white"/>
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
                                anchor={usuario.perfil === "GARCOM" ? "bottom end" : "bottom"}
                                className="w-36 mt-2 origin-top-right rounded-xl bg-[#F8F8F8] border-2 border-[#3B1206] p-1 text-sm text-[#3B1206] [--anchor-gap:var(--spacing-1)] focus:outline-none"
                                >
                                    <MenuItem>
                                        <p className="group flex w-full items-center text-justify leading-5 rounded-lg py-1.5 px-3 data-[focus]:bg-white/10">
                                            {props.item.observacao}
                                        </p>
                                    </MenuItem>
                            </MenuItems>
                        </Transition>
                    </Menu>
                }
            </td>
        </>
    );
}

export default CardItemPedido;