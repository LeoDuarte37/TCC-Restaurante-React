import './LoginPage.css'
import FormLogin from '../../components/login/forms/FormLogin';

function LoginPage() {
    return (
        <div className="caixa">
            <div className="caixaContent">
                <div>
                    <FormLogin />
                </div>
            </div>
        </div>
    );
}

export default LoginPage;