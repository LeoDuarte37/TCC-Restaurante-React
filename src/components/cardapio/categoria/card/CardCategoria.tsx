import { CaretDown } from "@phosphor-icons/react";
import Categoria from "../../../../models/categoria/Categoria";
import { Disclosure, DisclosureButton, DisclosurePanel } from "@headlessui/react";
import { useContext } from "react";
import { LoginContext } from "../../../../contexts/LoginContext";
import ListaSubcategoria from "../../subcategoria/lista/ListaSubcategoria";
import ModalAddSubcategoria from "../../subcategoria/modal/ModalAddSubcategoria";
import ModalEditCategoria from "../modal/ModalEditCategoria";

function CardCategoria(props: { categoria: Categoria }) {

    const { login } = useContext(LoginContext);

    return (
        <Disclosure as="div" className="" defaultOpen={true} >
            <div className="flex border border-[#3B1206] rounded-lg w-full cursor-pointer">
                {(login.perfil === "ADMIN" || login.perfil === "ROOT") &&
                    <ModalEditCategoria categoria={props.categoria} />
                }
                <DisclosureButton className="group flex w-full items-center gap-2 justify-between">
                    <button className="w-full h-10 inline-flex justify-center items-center w-full gap-1 rounded-md bg-[#3B1206] text-sm/6 font-semibold text-[#f8f8f8] shadow-inner shadow-white/10 focus:outline-none data-[hover]:bg-[#522213] data-[open]:bg-[#522213] data-[focus]:outline-1 data-[focus]:outline-white">
                        {props.categoria.nome}
                        <CaretDown size={18} color="white" />
                    </button>
                </DisclosureButton>

                {(login.perfil === "ADMIN" || login.perfil === "ROOT") &&
                    <ModalAddSubcategoria categoria={props.categoria} />
                }
            </div>
            <DisclosurePanel className="mt-4 text-md text-[#3B1206]">
                <ListaSubcategoria subcategorias={props.categoria.subcategoria} />
            </DisclosurePanel>
        </Disclosure>
    );
}

export default CardCategoria;