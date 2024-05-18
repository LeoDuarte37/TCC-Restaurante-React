import './LoginPage.css'
import ModalLogin from '../../components/login/modal/ModalLogin';
import { ChefHat } from '@phosphor-icons/react';

function LoginPage() {
    return (
        <div className="caixa">
            <div className="caixaContent">
                <div className='caixaTitle'>
                    <h1>Bon Patron</h1>
                    <ChefHat size={45} color='white'/>
                </div>
                <h2>Logar como:</h2>
                <div>
                    <ModalLogin mostrar={false}/>
                </div>
            </div>
        </div>
    );
}

export default LoginPage;