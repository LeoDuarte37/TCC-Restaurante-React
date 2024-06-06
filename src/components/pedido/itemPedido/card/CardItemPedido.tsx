import { useContext, useState } from "react";
import { LoginContext } from "../../../../contexts/LoginContext";
import Item from "../../../../models/Item";
import { Button, MenuItem, MenuItems, Transition } from "@headlessui/react";
import { CaretCircleDown } from "@phosphor-icons/react";

function CardItemPedido(props: { item: Item }) {

    const { usuario } = useContext(LoginContext);

    const [ isOpen, setIsOpen ] = useState<boolean>(false)

    return (
        <>
            <th scope="row" className="flex justify-center items-center w-full h-12 p-0 font-medium whitespace-nowrap">
                {props.item.produto.nome}
            </th>
            <td className="flex justify-center items-center w-full h-12 p-0">
                {props.item.quantidade}
            </td>
            {(usuario.perfil === "COZINHA" || usuario.perfil === "GARCOM") ? <></> :
                <td className="flex justify-center items-center w-full h-12 p-0">
                    R$ {props.item.produto.valor}
                </td>
            }
            <td className="flex justify-center items-center w-full h-12 p-0">
                { props.item.observacao && 
                    <>
                        <Button onClick={() => setIsOpen(!isOpen)} className="inline-flex auto items-center gap-2 rounded-md bg-gray-800 py-1.5 px-3 text-sm/6 font-semibold text-white shadow-inner shadow-white/10 focus:outline-none data-[hover]:bg-gray-700 data-[open]:bg-gray-700 data-[focus]:outline-1 data-[focus]:outline-white">
                            Ver observação
                            <CaretCircleDown size={20} color="white" />
                        </Button>
                        <Transition show={isOpen}
                            enter="transition ease-out duration-75"
                            enterFrom="opacity-0 scale-95"
                            enterTo="opacity-100 scale-100"
                            leave="transition ease-in duration-100"
                            leaveFrom="opacity-100 scale-100"
                            leaveTo="opacity-0 scale-95"
                            >
                            <MenuItems
                                anchor="bottom"
                                className="w-36 mt-2 origin-top-right rounded-xl border border-white/5 bg-white/5 p-1 text-sm/6 text-white [--anchor-gap:var(--spacing-1)] focus:outline-none"
                                >
                                    <MenuItem>
                                        
                                            <p className="group flex w-full items-center gap-2 rounded-lg py-1.5 px-3 data-[focus]:bg-white/10">
                                                {props.item.observacao}
                                            </p>
                                    </MenuItem>
                            </MenuItems>
                        
                        </Transition>
                    
                    </>
                }
            </td>
        </>
    );
}

export default CardItemPedido;