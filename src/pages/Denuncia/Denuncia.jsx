import { Container } from 'react-bootstrap';

// Componentes Globais que você já usa na Home
import Navbar from '../../components/Layout/Navbar';
import Footer from '../../components/Layout/Footer';

// Componentes Específicos (que você pode extrair para arquivos separados)
import EmergencyBanner from '../../components/Denuncia/EmergencyBanner';
import StepGuide from '../../components/Denuncia/StepGuide';
import OfficialChannel from '../../components/Denuncia/OfficialChannel';
import SupportChannels from '../../components/Denuncia/SupportChannels';

import '../../styles/global.css';

function Denuncia() {
  return (
    <>
      <Navbar />

      {/* Header Minimalista */}
      <header className="py-5 bg-light border-bottom">
        <Container className="text-center py-2 py-md-4">
          <span className="text-primary fw-bold text-uppercase small">Utilidade Pública</span>
          <h1 className="display-5 fw-bold mt-2">Central de Denúncias</h1>
          <p className="text-muted mx-auto mb-0" style={{ maxWidth: '600px' }}>
            Maus-tratos é crime. Sua denúncia é a voz daqueles que não podem falar.
          </p>
        </Container>
      </header>

      <main className="pb-5">
        <Container>
          {/* Banner flutuante de emergência */}
          <EmergencyBanner />

          {/* Seção de Passos */}
          <section className="my-5">
            <StepGuide />
          </section>

          {/* Canal da Polícia Civil */}
          <OfficialChannel />

          {/* Outros Canais */}
          <section className="my-5">
            <h5 className="fw-bold mb-4 text-center">Outros Canais de Apoio</h5>
            <SupportChannels />
          </section>
        </Container>
      </main>

      <Footer />
    </>
  );
}

export default Denuncia;