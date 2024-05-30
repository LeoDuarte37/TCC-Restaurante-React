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

function App() {
  return (
    <>

      <LoginProvider>
        <ToastContainer style={{ width: "250px" }}/>
        {/* <BrowserRouter> */}
        <MesaProvider> 
            <Navbar />
            {/* <DestaqueMesaPage /> */}
            {/* <CardapioMesaPage /> */}
            <ContaMesaPage />
            {/* <LoginPage /> */}
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
