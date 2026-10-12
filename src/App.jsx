import { BrowserRouter, Routes, Route, Navigate, Link } from 'react-router-dom';
import ScrollToTop from './utils/scrollToTop.js';
import { AuthProvider, RequireAuth, RequireAdmin } from './context/AuthContext.jsx';
import Home from './pages/Home/Index.jsx';
import Catalogo from './pages/Catalogo/Catalogo.jsx';
import Denuncia from './pages/Denuncia/Denuncia.jsx';
import Termos from './components/Termos/Termos.jsx';
import Perfil from './pages/Perfil/Perfil.jsx';
import Admin from './pages/Admin/AdminHome.jsx';
import PostPet from './pages/Admin/PostPet.jsx';
import Sobre from './pages/Sobre/SobreNos.jsx';
import ComoAjudar from './pages/ComoAjudar/ComoAjudar.jsx';
import PetDetails from './pages/Pet/PetDetails.jsx';
import Sponsorship from './pages/Sponsorship/Sponsorship.jsx';
import AdminSponsorships from './pages/Admin/AdminSponsorships.jsx';
import AdminHomeMedia from './pages/Admin/AdminHomeMedia.jsx';
import Navbar from './components/Layout/Navbar.jsx';
import Footer from './components/Layout/Footer.jsx';

const NotFound = () => (
  <><Navbar /><main className="container py-5 text-center" style={{ minHeight: '60vh', display: 'grid', placeContent: 'center' }}><i className="fas fa-paw fa-3x mb-3" style={{ color: 'var(--primary-color)' }} /><h1 className="h2 fw-bold">Página não encontrada</h1><p className="text-muted mb-4">O endereço acessado não existe ou foi removido.</p><Link className="btn btn-primary mx-auto" to="/home">Voltar para o início</Link></main><Footer /></>
);

function App() {
  return (
    <BrowserRouter basename={import.meta.env.BASE_URL}>
      <AuthProvider>
        <ScrollToTop />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/home" element={<Home />} />
          <Route path="/catalogo" element={<Catalogo />} />
          <Route path="/pets/:id" element={<PetDetails />} />
          <Route path="/apadrinhar/:id" element={<Sponsorship />} />
          <Route path="/denuncia" element={<Denuncia />} />
          <Route path="/termos" element={<Termos />} />
          <Route path="/sobre" element={<Sobre />} />
          <Route path="/como-ajudar" element={<ComoAjudar />} />
          <Route path="/doacao" element={<Navigate to="/como-ajudar#doacoes" replace />} />

          {/* Adotante logado */}
          <Route path="/perfil" element={<RequireAuth><Perfil /></RequireAuth>} />

          {/* Painel — exclusivo ADMIN */}
          <Route path="/admin" element={<RequireAdmin><Admin /></RequireAdmin>} />
          <Route path="/admin/apadrinhamentos" element={<RequireAdmin><AdminSponsorships /></RequireAdmin>} />
          <Route path="/admin/midias" element={<RequireAdmin><AdminHomeMedia /></RequireAdmin>} />
          <Route path="/admin/post-pet" element={<RequireAdmin><PostPet /></RequireAdmin>} />
          <Route path="/admin/edit-pet/:id" element={<RequireAdmin><PostPet /></RequireAdmin>} />

          <Route path="*" element={<NotFound />} />
        </Routes>
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;
