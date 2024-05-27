import { BrowserRouter } from 'react-router-dom';
import './App.css'
import Navbar from './components/navbar/Navbar'
import { LoginProvider } from './contexts/LoginContext'
import LoginPage from './pages/login/LoginPage'
import { ToastContainer } from 'react-toastify';
import { PedidoProvider } from './contexts/PedidoContext';
import { MesaProvider } from './contexts/MesaContext';
import CardapioMesaPage from './pages/mesa/cardapio/CardapioMesaPage';
import DestaqueMesaPage from './pages/mesa/destaques/DestaquesMesaPage';

function App() {
  return (
    <>
      <LoginProvider>
        <ToastContainer />
        {/* <BrowserRouter> */}
        <MesaProvider> 
          <PedidoProvider>
            <Navbar />
            {/* <DestaqueMesaPage /> */}
            <CardapioMesaPage />
            {/* <LoginPage /> */}
          </PedidoProvider>
        </MesaProvider>
        {/* </BrowserRouter> */}
      </LoginProvider>
    </>
  );
}

// https://tailwindui.com/components/ecommerce/components/category-filters
// https://tw-elements.com/docs/standard/components/scroll-back-to-top-button/
// https://tailwindui.com/components/application-ui/overlays/slide-overs

export default App;
