import "./ModalLogin.css"
import FormLoginColaborador from "../forms/FormLoginColaborador";
import { ArrowArcRight } from "@phosphor-icons/react";
import { Button, Dialog, DialogPanel, Transition, TransitionChild } from '@headlessui/react'
import { useState } from 'react'

function ModalLogin(props: { mostrar: boolean; }) {
    const [isOpenColaborador, setIsOpenColaborador] = useState(props.mostrar)

    const [isOpenMesa, setIsOpenMesa] = useState(props.mostrar)

    return (
        <>
            <Button
                onClick={() => setIsOpenColaborador(true)}
                className="button"
            >
                Colaborador
            </Button>

            <Button
                onClick={() => setIsOpenMesa(true)}
                className="button"
            >
                Mesa
            </Button>

            <Transition appear show={isOpenColaborador}>
                <Dialog as="div" className="relative z-10 focus:outline-none" onClose={() => setIsOpenColaborador(false)}>
                    <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
                        <div className="flex min-h-full items-center justify-center p-4">
                            <TransitionChild
                                enter="ease-out duration-300"
                                enterFrom="opacity-0 transform-[scale(95%)]"
                                enterTo="opacity-100 transform-[scale(100%)]"
                                leave="ease-in duration-200"
                                leaveFrom="opacity-100 transform-[scale(100%)]"
                                leaveTo="opacity-0 transform-[scale(95%)]"
                            >
                                <DialogPanel className="rounded-xl bg-white/5 px-6 pb-6 pt-0 backdrop-blur-2xl">
                                    <div className="flex justify-end my-2">
                                        <ArrowArcRight size={32} color="white" onClick={() => setIsOpenColaborador(false)} />
                                    </div>
                                    <FormLoginColaborador />
                                </DialogPanel>
                            </TransitionChild>
                        </div>
                    </div>
                </Dialog>
            </Transition>
        </>

    )
}


export default ModalLogin;

