import { ChangeEvent, useContext, useState } from "react";
import AddMesa from "../../../models/mesa/AddMesa";
import { adicionar } from "../../../services/Service";
import toastAlert from "../../../utils/toastAlert";
import { useNavigate } from "react-router-dom";
import { LoginContext } from "../../../contexts/LoginContext";


export default function FormMesa(props: { getMesas: Function }) {

    const navigate = useNavigate();
    
    const { login } = useContext(LoginContext);

    const [addMesa, setAddMesa] = useState<AddMesa>({
        numero: 0,
        restaurante: {
            id: login.restauranteId,
        },
    });

    function atualizarEstado(e: ChangeEvent<HTMLInputElement>) {
        setAddMesa({
            ...addMesa,
            [e.target.name]: e.target.value,
        })
    }

    async function submit(e: ChangeEvent<HTMLFormElement>) {
        e.preventDefault();

        try {
            await adicionar(`/mesa`, addMesa, {
                headers: {
                    Authorization: `Bearer ${login.token}`,
                },
            });
            
            toastAlert("Nova mesa adicionada!", "sucesso");
            props.getMesas();
            
        } catch (error: any) {
            toastAlert("Erro ao adicionar nova mesa. Por favor, tente novamente.", "erro")
            console.log(error)   
        }
    }

    return (
        <form onSubmit={submit} className="h-full p-4 flex flex-col justify-between text-[#3B1206] text-lg font-bold">
            <div className="flex flex-col gap-3">
                <div>
                    <label htmlFor="nome">
                        Número da mesa:
                    </label>
                    <input
                        type="number"
                        name="numero"
                        required
                        onChange={(e: ChangeEvent<HTMLInputElement>) => atualizarEstado(e)}
                        className='mt-3 block w-full rounded-lg border-2 border-[#D42300] bg-[#f8f8f8] py-1.5 px-3 text-sm/6 text-gray focus:outline-none focus:outline-1 focus:ring-[#D42300] focus:-outline-offset-0 focus:outline-' />
                </div>
            </div>

            <div className="h-full w-full flex justify-center items-center">
                <input 
                    type="submit" 
                    placeholder="Adicionar Mesa"
                    className="button h-14 p-0 w-full text-center self-center" />
            </div>
        </form>
    );
}