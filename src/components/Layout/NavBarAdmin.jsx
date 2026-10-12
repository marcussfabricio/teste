import { Link } from 'react-router-dom';
import logo from '../../assets/images/logo.png';
import { useAuth } from '../../context/AuthContext';


const Navbar = () => {
    const { logout } = useAuth();
    return (
        <nav className="navbar navbar-expand-lg navbar-light bg-white shadow-sm py-3">
            <div className="container">
                {/* Logo (Lado Esquerdo) */}
                <Link className="navbar-brand d-flex align-items-center fw-bold" to="/home">
                    <img src={logo} alt="Abrigo Animal Joinville" className="brand-logo me-2" />
                    <div className="brand-wordmark">
                        <span className="brand-name">ABRIGO ANIMAL</span>
                        <span className="brand-city">JOINVILLE</span>
                    </div>
                </Link>

                <div className="ms-auto d-flex align-items-center gap-2">
                    <Link to="/admin" className="btn btn-warning fw-bold px-2 px-md-3 shadow-sm" aria-label="Abrir painel administrativo">
                        <i className="fa-regular fa-user me-md-1"></i> <span className="d-none d-md-inline">Painel</span>
                    </Link>
                    <Link to="/home" onClick={logout} className="btn btn-outline-warning fw-bold px-2 px-md-3 shadow-sm" aria-label="Sair do painel">
                        <i className="fa-solid fa-right-from-bracket me-md-1"></i> <span className="d-none d-md-inline">Sair</span>
                    </Link>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
