import { BrowserRouter } from 'react-router-dom';
import './App.css'
import Navbar from './components/navbar/Navbar'
import { LoginProvider } from './contexts/LoginContext'
import LoginPage from './pages/login/LoginPage'
import { ToastContainer } from 'react-toastify';
import { PedidoProvider } from './contexts/PedidoContext';

function App() {

  return (
    <>
      <LoginProvider>
        <ToastContainer />
        {/* <BrowserRouter> */}
          {/* <PedidoProvider> */}
            <Navbar />
            {/* <LoginPage /> */}
          {/* </PedidoProvider> */}
        {/* </BrowserRouter> */}
      </LoginProvider>
    </>
  );
}

export default App;
