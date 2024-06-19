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
import ContaFechadaMesaPage from './pages/mesa/conta/ContaFechadaMesaPage';

function App() {
    return (
        <LoginProvider>
            <ToastContainer style={{ width: "250px" }} />
            <BrowserRouter>
                <MesaProvider>
                    <Navbar />

                    <Routes>
                        <Route path='/' element={<LoginPage />} />
                        <Route path='/mesa/cardapio' element={<CardapioMesaPage />} />
                        <Route path='/mesa/conta' element={<ContaMesaPage />} />
                        <Route path='/mesa/conta/fechada' element={<ContaFechadaMesaPage />} />
                        {/* <Route path='/' element={} /> */}
                        <Route path='/historico/pedidos' element={<PedidoPage />} />
                        <Route path='/cardapio' element={<CardapioPage />} />
                        <Route path='/mesas' element={<MesaPage />} />
                    </Routes>

                </MesaProvider>
            </BrowserRouter>
        </LoginProvider>
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

/*
  {
    id: 1,
    mesa: {
        numero: 4,
    },
    item: [
        {
            "produto": {
                "id": 1,
                "nome": "Prato especial",
                "descricao": "Especial da casa! Acompanha... Especial da casa! Acompanha...",
                "foto": "https://http2.mlstatic.com/D_NQ_NP_984716-MLU74556662341_022024-O.webp",
                "valor": 25.99, "disponivel": true
            },
            "quantidade": 2
        },
        {
            "produto": {
                "id": 2,
                "nome": "Prato", "descricao": "Especial da casa! Acompanha... Especial da casa! Acompanha...", "foto": "https://http2.mlstatic.com/D_NQ_NP_984716-MLU74556662341_022024-O.webp", "valor": 25.99, "disponivel": true
            },
            "quantidade": 3,
            "observacao": "Sem farofa sem farofa sem farofa sem farofa"
        },
    ],
    data: "11/03/2024 16:48",
    status: "REALIZADO",
  },
*/

/* 
  {
    id: 1,
    nome: "Comidas",
    subCategoria: [
        {
            id: 1,
            nome: "Pratos especiais",
            disponivel: true,
            produto: [
                {
                    id: 1,
                    nome: "Prato especial",
                    descricao: "Especial da casa! Acompanha... Especial da casa! Acompanha...",
                    foto: "https://http2.mlstatic.com/D_NQ_NP_984716-MLU74556662341_022024-O.webp",
                    valor: 25.99,
                    disponivel: true
                },
                {
                    id: 2,
                    nome: "Prato",
                    descricao: "Especial da casa! Acompanha... Especial da casa! Acompanha...",
                    foto: "https://http2.mlstatic.com/D_NQ_NP_984716-MLU74556662341_022024-O.webp",
                    valor: 25.99,
                    disponivel: true
                },
                {
                    id: 3,
                    nome: "Prato especial",
                    descricao: "Especial da casa! Acompanha... Especial da casa! Acompanha...",
                    foto: "https://http2.mlstatic.com/D_NQ_NP_984716-MLU74556662341_022024-O.webp",
                    valor: 25.99,
                    disponivel: true
                },
                {
                    id: 4,
                    nome: "Prato especial",
                    descricao: "Especial da casa! Acompanha... Especial da casa! Acompanha...",
                    foto: "https://http2.mlstatic.com/D_NQ_NP_984716-MLU74556662341_022024-O.webp",
                    valor: 25.99,
                    disponivel: true
                },
            ],
        },
        {
            id: 2,
            nome: "Lanches",
            disponivel: true,
            produto: [
                {
                    id: 5,
                    nome: "Prato especial",
                    descricao: "Especial da casa! Acompanha... Especial da casa! Acompanha...",
                    foto: "https://http2.mlstatic.com/D_NQ_NP_984716-MLU74556662341_022024-O.webp",
                    valor: 25.99,
                    disponivel: true
                },
                {
                    id: 6,
                    nome: "Prato especial",
                    descricao: "Especial da casa! Acompanha... Especial da casa! Acompanha...",
                    foto: "https://http2.mlstatic.com/D_NQ_NP_984716-MLU74556662341_022024-O.webp",
                    valor: 25.99,
                    disponivel: true
                },
            ],
        },
    ],
    disponivel: true,
},
{
    id: 2,
    nome: "Bebidas",
    subCategoria: [
        {
            id: 1,
            nome: "Refrigerantes",
            produto: [
                {
                    id: 1,
                    nome: "Prato especial",
                    descricao: "Especial da casa! Acompanha... Especial da casa! Acompanha...",
                    foto: "https://http2.mlstatic.com/D_NQ_NP_984716-MLU74556662341_022024-O.webp",
                    valor: 25.99,
                    disponivel: true
                }
            ],
            disponivel: true,
        },
        {
            id: 1,
            nome: "Alcoolicos",
            produto: [
                {
                    id: 1,
                    nome: "Prato especial",
                    descricao: "Especial da casa! Acompanha... Especial da casa! Acompanha...",
                    foto: "https://http2.mlstatic.com/D_NQ_NP_984716-MLU74556662341_022024-O.webp",
                    valor: 25.99,
                    disponivel: true
                }
            ],
            disponivel: true,
        },
    ],
    disponivel: true,
},
{
    id: 3,
    nome: "Sobremesas",
    subCategoria: [
        {
            id: 1,
            nome: "Sorvetes",
            produto: [
                {
                    id: 1,
                    nome: "Prato especial",
                    descricao: "Especial da casa! Acompanha... Especial da casa! Acompanha...",
                    foto: "https://http2.mlstatic.com/D_NQ_NP_984716-MLU74556662341_022024-O.webp",
                    valor: 25.99,
                    disponivel: true
                }
            ],
            disponivel: true,
        },
    ],
    disponivel: true,
},
*/

export default App;
