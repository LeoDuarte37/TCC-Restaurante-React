import { BrowserRouter } from 'react-router-dom';
import './App.css'
import Navbar from './components/navbar/Navbar'
import { LoginProvider } from './contexts/LoginContext'
import LoginPage from './pages/login/LoginPage'
import { ToastContainer } from 'react-toastify';
import { PedidoProvider } from './contexts/PedidoContext';
import { MesaProvider } from './contexts/MesaContext';
import CardCategoria from './components/categoria/card/CardCategoria';
import CardapioPage from './pages/mesa/cardapio/CardapioPage';

function App() {
  return (
    <>
      <LoginProvider>
        <ToastContainer />
        {/* <BrowserRouter> */}
        <MesaProvider> 
          <PedidoProvider>
            <Navbar />
            <CardapioPage />
            {/* <LoginPage /> */}
          </PedidoProvider>
        </MesaProvider>
        {/* </BrowserRouter> */}
      </LoginProvider>
    </>
  );
}

export default App;
