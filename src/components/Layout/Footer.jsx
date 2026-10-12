import './Footer.css'
import { Link } from 'react-router-dom';
import logo from '../../assets/images/logo.png';

const Footer = () => {
  return (
    <footer className="site-footer py-5 border-top">
      <div className="container">
        <div className="row g-4">
          
          {/* Branding */}
          <div className="col-lg-4 col-md-6">
            <img
              src={logo}
              alt="Abrigo Animal Joinville"
              className="footer-logo mb-3"
            />
            <p className="small">
              ONG sem fins lucrativos fundada em 2001, dedicada à proteção e ao cuidado responsável de animais em Joinville.
            </p>
          </div>

          {/* Institucional */}
          <div className="col-lg-2 col-md-6">
            <h5 className="fw-bold mb-3">Institucional</h5>
            <ul className="list-unstyled">
              <li className="mb-2"><Link to="/sobre" className="text-decoration-none small">Sobre Nós</Link></li>
              <li className="mb-2"><Link to="/como-ajudar" className="text-decoration-none small">Como Ajudar</Link></li>
              <li className="mb-2"><Link to="/denuncia" className="text-decoration-none small">Denúncias</Link></li>
            </ul>
          </div>

          {/* Envolva-se */}
          <div className="col-lg-2 col-md-6">
            <h5 className="fw-bold mb-3">Envolva-se</h5>
            <ul className="list-unstyled">
              <li className="mb-2"><Link to="/catalogo" className="text-decoration-none small">Quero Adotar</Link></li>
              <li className="mb-2"><Link to="/catalogo" className="text-decoration-none small">Apadrinhe</Link></li>
              <li className="mb-2"><Link to="/como-ajudar#doacoes" className="text-decoration-none small">Faça uma Doação</Link></li>
            </ul>
          </div>

          {/* Redes Sociais e Contato */}
          <div className="col-lg-4 col-md-6">
            <h5 className="fw-bold mb-3">Conecte-se com a ONG</h5>
            <p className="small mb-3">Acompanhe nossos resgates e finais felizes diariamente:</p>
            
            <div className="d-flex gap-2 flex-wrap mb-4">
              <a href="https://www.instagram.com/abrigoanimaldejoinville/" target="_blank" rel="noreferrer" className="btn btn-outline-primary btn-sm instagram">
                <i className="bi bi-instagram me-2"></i>Instagram
              </a>
              <a href="https://www.facebook.com/profile.php?id=100080446760196" target="_blank" rel="noreferrer" className="btn btn-outline-primary btn-sm facebook">
                <i className="bi bi-facebook me-2"></i>Facebook
              </a>
            </div>

            <div className="small d-flex flex-column">
              <span className="mb-0 text-light"><i className="bi bi-geo-alt me-2 text-warning"></i>Joinville, SC</span>
            </div>
          </div>

        </div>

        {/* Rodapé Inferior */}
        <div className="mt-5 pt-4 border-top">
          <div className="row align-items-center">
            <div className="col-md-6 text-center text-md-start">
              <p className="small mb-0">
                &copy; 2026 Abrigo Animal Joinville.
              </p>
            </div>
            <div className="col-md-6 text-center text-md-end">
              <Link to="/termos" className="text-decoration-none small">Privacidade e Termos de Uso</Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
