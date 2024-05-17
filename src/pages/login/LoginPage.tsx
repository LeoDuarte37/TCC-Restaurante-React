import './LoginPage.css'
import ModalLogin from '../../components/login/modal/ModalLogin';

function LoginPage() {

    return (
        <div className="caixa">
            <div className="caixaContent">
                <h1>Nome do sistema</h1>
                <h2>Logar como:</h2>
                <div>
                    <ModalLogin mostrar={false}/>
                </div>
            </div>
        </div>
    );
}

export default LoginPage;