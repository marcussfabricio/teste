import { Link } from 'react-router-dom';
import logo from '../../assets/images/logo.png';
import ThemeToggle from './ThemeToggle';
import { useAuth } from '../../context/AuthContext';

const Navbar = () => {
  const { isAuthenticated, isAdmin, user, openAuthModal, logout } = useAuth();

  return (
    <nav className="navbar site-navbar navbar-expand-lg navbar-light bg-white shadow-sm py-2 sticky-top">
      <div className="container">
        {/* Logo (Lado Esquerdo) */}
        <Link className="navbar-brand d-flex align-items-center fw-bold" to="/home">
          <img src={logo} alt="Abrigo Animal Joinville" className="brand-logo me-2" />
          <div className="brand-wordmark">
            <span className="brand-name">ABRIGO ANIMAL</span>
            <span className="brand-city">JOINVILLE</span>
          </div>
        </Link>

        {/* Botão Hamburger (mobile) */}
        <button
          className="navbar-toggler border-0"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Abrir menu"
        >
          <i className="fas fa-bars" aria-hidden="true"></i>
        </button>

        {/* Links */}
        <div className="collapse navbar-collapse justify-content-end" id="navbarNav">
          <ul className="navbar-nav align-items-lg-center gap-1 py-3 py-lg-0">
            <li className="nav-item">
              <Link className="nav-link px-3" to="/catalogo">Conheça os cães</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link px-3" to="/como-ajudar">Como ajudar</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link px-3" to="/denuncia">Denúncias</Link>
            </li>
            <li className="nav-item">
              <ThemeToggle />
            </li>

            {!isAuthenticated ? (
              <li className="nav-item mt-2 mt-lg-0 ms-lg-3">
                <button
                  type="button"
                  onClick={() => openAuthModal('login')}
                  className="btn fw-bold text-white px-4 shadow-sm"
                  style={{ backgroundColor: 'var(--primary-color)', borderRadius: 'var(--border-radius-pill)' }}
                >
                  Login <i className="fas fa-right-to-bracket ms-1"></i>
                </button>
              </li>
            ) : (
              <>
                {isAdmin ? (
                  <li className="nav-item mt-2 mt-lg-0 ms-lg-3">
                    <Link
                      to="/admin"
                      className="btn fw-bold text-white px-4 shadow-sm"
                      style={{ backgroundColor: 'var(--button-color)', borderRadius: 'var(--border-radius-pill)' }}
                    >
                      <i className="fas fa-gauge-high me-1"></i> Painel
                    </Link>
                  </li>
                ) : (
                  <li className="nav-item mt-2 mt-lg-0 ms-lg-3">
                    <Link
                      to="/perfil"
                      className="btn fw-bold text-white px-4 shadow-sm"
                      style={{ backgroundColor: 'var(--primary-color)', borderRadius: 'var(--border-radius-pill)' }}
                      title={user?.nomeCompleto}
                    >
                      <i className="fa-regular fa-user me-1"></i> Meu Perfil
                    </Link>
                  </li>
                )}
                <li className="nav-item mt-2 mt-lg-0 ms-lg-2">
                  <button
                    type="button"
                    onClick={logout}
                    className="btn btn-outline-secondary fw-semibold px-3"
                    style={{ borderRadius: 'var(--border-radius-pill)' }}
                    title="Sair"
                    aria-label="Sair da conta"
                  >
                    <i className="fas fa-right-from-bracket"></i>
                  </button>
                </li>
              </>
            )}
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
