import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css'
import Navbar from './components/navbar/Navbar'
import { LoginProvider } from './contexts/LoginContext'
import LoginPage from './pages/login/LoginPage'
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { MesaProvider } from './contexts/MesaContext';
import CardapioMesaPage from './pages/mesa/cardapio/CardapioMesaPage';
import ContaMesaPage from './pages/mesa/conta/ContaMesaPage';
import MesaPage from './pages/mesa/MesaPage';
import PedidoPage from './pages/pedido/PedidoPage';
import CardapioPage from './pages/cardapio/CardapioPage';

function App() {
  return (
    <>
        <LoginProvider>
          <ToastContainer style={{ width: "250px" }}/>
          <BrowserRouter>
            <MesaProvider> 
                <Navbar />
                
                <Routes>
                  <Route path='/' element={<LoginPage />} />
                  <Route path='/mesa/cardapio' element={<CardapioMesaPage />} />
                  <Route path='/mesa/conta' element={<ContaMesaPage />} />
                  {/* <Route path='/' element={} /> */}
                  <Route path='/historico/pedidos' element={<PedidoPage />} />
                  <Route path='/cardapio' element={<CardapioPage />} />
                  <Route path='/mesas' element={<MesaPage />} />
                </Routes>
                  
            </MesaProvider>
          </BrowserRouter>
        </LoginProvider>
    </>
  );
}

/* 
  Palete de cores: 

    Laranja: #D42300
    Branco: #F8F8F8
    Bege: #F5EBDC
    Marrom: #3B1206
*/

// https://tailwindui.com/components/ecommerce/components/category-filters
// https://tw-elements.com/docs/standard/components/scroll-back-to-top-button/
// https://tailwindui.com/components/application-ui/overlays/slide-overs

// listar pedidos por dia atual: 
// https://pt.stackoverflow.com/questions/313880/java-query-spring-com-data-atual

export default App;
