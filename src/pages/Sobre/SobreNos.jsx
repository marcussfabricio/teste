import { Link } from 'react-router-dom';
import Navbar from '../../components/Layout/Navbar';
import Footer from '../../components/Layout/Footer';
import HistorySection from '../../components/Sobre/HistorySection';
import Pilares from '../../components/Sobre/Pilares';
import imgHistoria1 from '../../assets/branding/resgate_ia.png';
import imgHistoria2 from '../../assets/branding/reability_ia.png';
import aboutHeroImage from '../../assets/branding/abrigo-sobre-limpo.png';
import './SobreNos.css';

const Sobre = () => (
  <>
    <Navbar />
    <main className="about-page">
      <header className="about-hero" style={{ '--about-hero-image': 'url(' + aboutHeroImage + ')' }}>
        <div className="container">
          <span>Organização não governamental • Joinville/SC</span>
          <h1>Proteção, cuidado e uma nova chance desde 2001.</h1>
          <p>A Associação Abrigo Animal atua sem fins lucrativos para acolher e proteger animais domésticos abandonados ou vítimas de maus-tratos.</p>
          <div className="about-hero-actions"><Link className="btn btn-primary" to="/catalogo">Conhecer os cães</Link><Link className="btn btn-outline-primary" to="/como-ajudar">Como ajudar</Link></div>
        </div>
      </header>

      <section className="about-facts" aria-label="Informações institucionais"><div className="container"><div><strong>Julho de 2001</strong><span>Fundação por voluntários</span></div><div><strong>ONG sem fins lucrativos</strong><span>Associação independente</span></div><div><strong>04.603.573/0001-60</strong><span>CNPJ da Associação</span></div></div></section>

      <HistorySection ano="Nossa história" titulo="Uma iniciativa que nasceu do voluntariado" imagem={imgHistoria1} legenda="Proteção e acolhimento">
        <p>O Abrigo Animal foi fundado por voluntários em julho de 2001 com um propósito claro: proteger animais domésticos abandonados e maltratados.</p>
        <p>Desde então, o trabalho reúne abrigo, alimentação, vacinação, castração e atendimento veterinário para que cada animal possa se recuperar com dignidade.</p>
      </HistorySection>

      <HistorySection titulo="Cuidado responsável, dentro dos nossos limites" imagem={imgHistoria2} legenda="Recuperação e bem-estar" reverse>
        <p>Muitos animais chegam debilitados e precisam de acompanhamento contínuo. Quando há condições para um resgate emergencial, o abrigo encaminha o animal para atendimento veterinário e assume os cuidados possíveis.</p>
        <p>Somos uma organização independente, não um órgão público, e não mantemos estrutura veterinária própria. Por isso, cada doação e apoio responsável faz diferença.</p>
      </HistorySection>

      <section className="about-support"><div className="container"><div><span>Como o trabalho continua</span><h2>A comunidade mantém esta história viva.</h2><p>O abrigo é mantido por doações da população, pelo Brechó anexo e pelo tempo dedicado por voluntários. Esse apoio cobre alimentação, medicamentos, castrações e cuidados veterinários.</p></div><div className="about-support-actions"><Link className="btn btn-primary" to="/como-ajudar">Como ajudar</Link><Link className="btn btn-outline-primary" to="/como-ajudar#doacoes">Doar itens</Link></div></div></section>
      <Pilares />
    </main>
    <Footer />
  </>
);

export default Sobre;
