import { BrowserRouter } from 'react-router-dom';
import './App.css'
import Navbar from './components/navbar/Navbar'
import { LoginProvider } from './contexts/LoginContext'
import LoginPage from './pages/login/LoginPage'
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { MesaProvider } from './contexts/MesaContext';
import CardapioMesaPage from './pages/mesa/cardapio/CardapioMesaPage';
import DestaqueMesaPage from './pages/mesa/destaques/DestaquesMesaPage';
import ContaMesaPage from './pages/mesa/conta/ContaMesaPage';
import CardMesa from './components/mesa/card/CardMesa';
import MesaPage from './pages/mesa/MesaPage';
import PedidoPage from './pages/pedido/PedidoPage';
import { ChamandoGarcomProvider } from './contexts/ChamandoGarcomContext';

function App() {
  return (
    <>
      <ChamandoGarcomProvider>
        <ToastContainer style={{ width: "250px" }}/>
        <LoginProvider>
          {/* <BrowserRouter> */}
          <MesaProvider> 
              {/* <Navbar /> */}
              {/* <DestaqueMesaPage /> */}
              {/* <CardapioMesaPage /> */}
              {/* <ContaMesaPage /> */}
              {/* <CardMesa /> */}
              {/* <MesaPage /> */}
              {/* <PedidoPage /> */}
              <LoginPage />
          </MesaProvider>
          {/* </BrowserRouter> */}
        </LoginProvider>
      </ChamandoGarcomProvider>
    </>
  );
}

// https://tailwindui.com/components/ecommerce/components/category-filters
// https://tw-elements.com/docs/standard/components/scroll-back-to-top-button/
// https://tailwindui.com/components/application-ui/overlays/slide-overs

// listar pedidos por dia atual: 
// https://pt.stackoverflow.com/questions/313880/java-query-spring-com-data-atual

export default App;
