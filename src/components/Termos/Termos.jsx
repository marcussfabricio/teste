import { Container, Row, Col } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import Navbar from '../../components/Layout/Navbar';
import Footer from '../../components/Layout/Footer';

const Termos = () => {
  return (
    <>
      <Navbar />

      <main className="bg-white py-5">
        <Container className="py-5">
          <Row className="justify-content-center">
            <Col lg={8}>
            
              <div className="row">
                <Link to="/home" className="text-decoration-none text-primary fw-bold mb-4 d-inline-block">
                  <i className="fas fa-arrow-left me-2"></i> Voltar para o site
                </Link>
              </div>

              <div className="text-center">
                <h1 className="fw-bold mb-4" style={{ borderBottom: '3px solid var(--primary-color)', display: 'inline-block' }}>
                  Termos e Privacidade
                </h1>
              </div>

              <div className="mt-4">
                <section className="mb-5">
                  <h2 className="h4 fw-bold text-dark mb-3">1. Termos de Uso</h2>
                  <p className="text-secondary">
                    Ao acessar o site <strong>Abrigo Animal Joinville</strong>, você concorda em utilizar este espaço para consultar os cães, conhecer o abrigo e entrar em contato pelos canais indicados.
                  </p>
                  <ul className="text-secondary">
                    <li className="mb-2"><strong>Contas locais:</strong> você pode criar uma conta de demonstração para acompanhar interesses de apadrinhamento neste navegador.</li>
                    <li className="mb-2">As fotos e os textos dos cães devem ser usados apenas para divulgar o trabalho do abrigo.</li>
                    <li className="mb-2">O <strong>painel administrativo</strong> é de uso exclusivo da equipe autorizada da ONG, com finalidade unicamente de gerenciamento.</li>
                    <li className="mb-2">O botão de adoção abre o WhatsApp do abrigo. A equipe orienta o processo diretamente pelo contato.</li>
                  </ul>
                </section>

                <section className="mb-5">
                  <h2 className="h4 fw-bold text-dark mb-3">2. Política de Privacidade</h2>
                  <p className="text-secondary">
                    Esta página descreve os dados usados pelas funcionalidades disponíveis no site:
                  </p>
                  <ul className="text-secondary">
                    <li className="mb-2"><strong>Armazenamento local:</strong> contas, preferências, apadrinhamentos, cães cadastrados e mídias administrativas ficam somente neste navegador, usando recursos como localStorage e IndexedDB.</li>
                    <li className="mb-2"><strong>Cadastro:</strong> nome, e-mail, telefone e senha são usados apenas para demonstrar a experiência de acesso local. Não reutilize uma senha real.</li>
                    <li className="mb-2"><strong>Apadrinhamentos:</strong> os interesses enviados ficam associados ao e-mail da conta local para aparecerem no perfil.</li>
                    <li className="mb-2"><strong>Imagens e vídeos:</strong> arquivos adicionados pelo painel ficam neste navegador e aparecem somente nesta instalação do front-end.</li>
                    <li className="mb-2"><strong>Contato:</strong> ao escolher falar com o abrigo pelo WhatsApp, a conversa acontece nessa plataforma.</li>
                  </ul>
                </section>

                <section className="mb-5">
                  <h2 className="h4 fw-bold text-dark mb-3">3. Controle dos dados locais</h2>
                  <p className="text-secondary">
                    Os dados de perfil podem ser editados na página de perfil. Como esta versão não usa servidor, limpar os dados do site no navegador também remove contas, apadrinhamentos, cadastros e mídias salvos localmente.
                  </p>
                </section>

                <footer className="mt-5 pt-4 border-top">
                  <p className="text-muted small">Em caso de dúvidas, entre em contato com o abrigo pelos canais oficiais.</p>
                </footer>
              </div>
            </Col>
          </Row>
        </Container>
      </main>

      <Footer />
    </>
  );
};

export default Termos;
