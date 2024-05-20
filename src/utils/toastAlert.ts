import { toast } from 'react-toastify';

function toastAlert(mensagem: string, tipo: string) {
    
    switch (tipo) {
        case "sucesso": 
            toast.success(mensagem, {
                position: 'bottom-left',
                autoClose: 2000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: false,
                draggable: false,
                theme: 'colored',
                progress: undefined,
            });

            break;

        case "erro":
            toast.error(mensagem, {
                position: 'bottom-left',
                autoClose: 2000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: false,
                draggable: false,
                theme: 'colored',
                progress: undefined,
            });

            break;

        default:
            toast.info(mensagem, {
                position: 'bottom-left',
                autoClose: 2000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: false,
                draggable: false,
                theme: 'colored',
                progress: undefined,
            });

            break;
    }
}

export default toastAlert;