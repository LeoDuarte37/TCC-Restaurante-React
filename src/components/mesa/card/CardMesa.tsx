import Mesa from "../../../models/mesa/Mesa";
import { useContext, useEffect, useState } from "react";
import { LoginContext } from "../../../contexts/LoginContext";
import useMesa from "../../../hooks/useMesa";
import Pedido from "../../../models/pedido/Pedido";
import { buscarPedidosPorStatusOuMesa, fecharConta } from "../../../services/Service";
import { RotatingLines } from "react-loader-spinner";
import { Transition, Dialog, TransitionChild, DialogPanel } from "@headlessui/react";
import { X } from "@phosphor-icons/react";
import ListaPedido from "../../pedido/lista/ListaPedido";
import toastAlert from "../../../utils/toastAlert";
import { useNavigate } from "react-router-dom";
import ListarPedidosPorMesaAndStatus from "../../../models/pedido/ListarPedidosPorMesaAndStatus";

function CardMesa(props: { mesa: Mesa; getInfo: Function }) {

    const { login, handleLogout } = useContext(LoginContext);
    const { atenderMesa } = useMesa();

    const navigate = useNavigate();

    const [pedidos, setPedidos] = useState<Array<Pedido>>([]);

    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [isOpen, setIsOpen] = useState<boolean>(false);

    function atender() {
        atenderMesa(props.mesa.id);
        props.getInfo();
    }

    async function getPedidosByMesa() {
        try {
            setIsLoading(true);

            const listarPedidosPorMesaAndStatus: ListarPedidosPorMesaAndStatus = {
                mesa: props.mesa.id,
                statusPedidos: ["R", "F", "E"]
            }

            await buscarPedidosPorStatusOuMesa(`/pedido/listar/mesa`, listarPedidosPorMesaAndStatus, setPedidos, {
                headers: {
                    Authorization: login.token,
                },
            });

            setIsLoading(false);
            setIsOpen(true);
        } catch (error: any) {
            if (error.toString().includes('403')) {
                toastAlert("Por favor, faça login novamente!", "info");
                handleLogout();
                navigate('/');
            }
        }
    }

    useEffect(() => {
        getPedidosByMesa;
    }, [pedidos])

    async function fecharMesa() {
        try {
            await fecharConta(props.mesa.id, {
                headers: {
                    Authorization: `Bearer ${login.token}`,
                },
            });
            props.getInfo();
        } catch (error) {
            toastAlert("Erro ao fechar conta! Tente novamente.", "erro");
        }
    }

    return (
        <>
            {login.perfil === "GARCOM"
                ? <button onClick={atender} className="button w-32 h-16 flex flex-col justify-center items-center">
                    <p>Mesa</p>
                    {props.mesa.numero}
                </button>

                : <>
                    {props.mesa.status === "DISPONIVEL"
                        ? <button onClick={getPedidosByMesa} className="mesaDisponivel">
                            <p>Mesa</p>
                            <p>
                                {!isLoading ? props.mesa.numero
                                    : <RotatingLines
                                        strokeColor="white"
                                        strokeWidth="5"
                                        animationDuration="0.75"
                                        width="24"
                                        visible={true}
                                    />
                                }
                            </p>
                        </button>

                        : <button onClick={getPedidosByMesa} className={props.mesa.status === "ABERTA" ? "mesaAberta" : "mesaPendente"}>
                            <p>Mesa</p>
                            <p>
                                {!isLoading ? props.mesa.numero
                                    : <RotatingLines
                                        strokeColor="white"
                                        strokeWidth="5"
                                        animationDuration="0.75"
                                        width="24"
                                        visible={true}
                                    />
                                }
                            </p>
                        </button>
                    }
                </>
            }

            <Transition appear show={isOpen} >
                <Dialog as="div" className="absolute inset-0 z-10 p-10 w-screen focus:outline-none"
                    onClose={() => setIsOpen(false)}>

                    <div className="flex min-h-full w-full items-center justify-center">
                        <TransitionChild
                            enter="ease-out duration-200"
                            enterFrom="opacity-0 transform-[scale(95%)]"
                            enterTo="opacity-100 transform-[scale(100%)]"
                            leave="ease-in duration-200"
                            leaveFrom="opacity-100 transform-[scale(100%)]"
                            leaveTo="opacity-0 transform-[scale(95%)]"
                        >
                            <DialogPanel className="flex justify-center rounded-xl h-full w-full max-[440px]:max-w-full max-w-[70%] p-10 max-[440px]:p-2">

                                <div className="container h-full w-full flex justify-center items-center rounded-xl">
                                    <div className="modalItemMesa rounded-xl max-[440px]:p-2">
                                        <div className="flex justify-between w-full my-4">
                                            <h1 className="text-[#D42300] ml-6 uppercase whitespace-pre text-center w-full subCategoriaTitle text-2xl font-bold">
                                                Pedidos  -  Mesa {props.mesa.numero}
                                            </h1>
                                            <X size={32} color="#3B1206" onClick={() => setIsOpen(false)} />
                                        </div>

                                        <div className="w-full h-full mb-4 flex flex-col justify-center items-center rounded-xl bg-white/5 overflow-hidden backdrop-blur-2xl">
                                            <ListaPedido pedidos={pedidos} />
                                        </div>
                                    </div>
                                </div>
                            </DialogPanel>
                        </TransitionChild>
                    </div>
                </Dialog>
            </Transition>
        </>
    );
}

export default CardMesa;