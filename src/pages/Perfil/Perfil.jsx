import { useState } from "react";
import { Container, Row, Col, Card, Form, Button, Spinner } from "react-bootstrap";
import { Link } from "react-router-dom";
import Navbar from "../../components/Layout/Navbar";
import Footer from "../../components/Layout/Footer";
import { useAuth } from "../../context/AuthContext";
import AlterarEmailPerfil from "../../components/Auth/AlterarEmailPerfil";
import { getAllPets } from "../../services/petService";
import { getSponsorshipsByEmail } from "../../services/sponsorshipService";
import { showSuccess, showError } from "../../utils/swalHelper";

const membroDesde = (criadoEm) => {
  if (!criadoEm) return "—";
  const d = new Date(criadoEm);
  const txt = d.toLocaleDateString("pt-BR", { month: "long", year: "numeric" });
  return txt.charAt(0).toUpperCase() + txt.slice(1);
};

const SectionCard = ({ icon, title, subtitle, children }) => (
  <Card className="border-0 shadow-sm rounded-4 mb-4">
    <Card.Body className="p-4">
      <div className="d-flex align-items-center gap-2 mb-3">
        <i className={`fas ${icon}`} style={{ color: "var(--primary-color)" }}></i>
        <h5 className="fw-bold mb-0" style={{ color: "var(--text-color)" }}>{title}</h5>
      </div>
      {subtitle && <p className="text-muted small mb-3">{subtitle}</p>}
      {children}
    </Card.Body>
  </Card>
);

const Perfil = () => {
  const { user, updateProfile } = useAuth();
  const [apadrinhamentos] = useState(() => {
    const dogs = getAllPets();
    return getSponsorshipsByEmail(user?.email).map((item) => ({
      ...item,
      pet: dogs.find((dog) => String(dog.id) === String(item.petId)),
    }));
  });

  const [form, setForm] = useState({
    nomeCompleto: user?.nomeCompleto || "",
    telefone: user?.telefone || "",
  });
  const [salvando, setSalvando] = useState(false);
  const [salvandoEmails, setSalvandoEmails] = useState(false);

  const onChange = (e) => setForm((f) => ({ ...f, [e.target.name]: e.target.value }));

  const salvarDados = async (e) => {
    e.preventDefault();
    setSalvando(true);
    try {
      await updateProfile(form);
      showSuccess("Dados atualizados!");
    } catch (err) {
      showError("Não foi possível salvar", err.message);
    } finally {
      setSalvando(false);
    }
  };

  const toggleEmails = async (e) => {
    const receberEmails = e.target.checked;
    setSalvandoEmails(true);
    try {
      await updateProfile({ receberEmails });
    } catch (err) {
      showError("Não foi possível salvar a preferência", err.message);
    } finally {
      setSalvandoEmails(false);
    }
  };

  if (!user) return null;
  const primeiroNome = user.nomeCompleto?.split(" ")[0];

  return (
    <>
      <Navbar />
      <main style={{ backgroundColor: "var(--background-color)" }}>
        <Container className="py-5">
          <div className="mb-4">
            <h1 className="h2 fw-bold mb-1" style={{ color: "var(--text-color)" }}>Olá, {primeiroNome}!</h1>
            <p className="text-muted mb-0">
              <i className="fas fa-calendar-day me-2" style={{ color: "var(--secondary-color)" }}></i>
              Membro desde {membroDesde(user.criadoEm)}
            </p>
          </div>

          <Row>
            <Col lg={7}>
              {/* 1. Meus Dados */}
              <SectionCard icon="fa-id-card" title="Meus dados" subtitle="Mantenha seus dados de contato atualizados neste navegador.">
                <Form onSubmit={salvarDados}>
                  <Row className="g-3">
                    <Col md={6}>
                      <Form.Label className="small fw-bold text-muted">Nome completo</Form.Label>
                      <Form.Control name="nomeCompleto" value={form.nomeCompleto} onChange={onChange} />
                    </Col>
                    <Col md={6}>
                      <AlterarEmailPerfil />
                    </Col>
                    <Col md={6}>
                      <Form.Label className="small fw-bold text-muted">Telefone</Form.Label>
                      <Form.Control name="telefone" value={form.telefone} onChange={onChange} />
                    </Col>
                  </Row>
                  <Button type="submit" disabled={salvando} className="mt-4 fw-bold text-white px-4" style={{ backgroundColor: "var(--primary-color)", border: "none" }}>
                    {salvando ? <Spinner size="sm" animation="border" /> : <><i className="fas fa-save me-2"></i>Salvar</>}
                  </Button>
                </Form>
              </SectionCard>

              {/* 4. Configurações */}
              <SectionCard icon="fa-gear" title="Configurações">
                <div className="d-flex align-items-center justify-content-between">
                  <div>
                    <div className="fw-semibold" style={{ color: "var(--text-color)" }}>Novidades por e-mail</div>
                    <div className="text-muted small">Receba avisos sobre novos cães e novidades do abrigo.</div>
                  </div>
                  <Form.Check type="switch" id="switch-emails" checked={!!user.receberEmails} onChange={toggleEmails} disabled={salvandoEmails} />
                </div>
              </SectionCard>
            </Col>

            <Col lg={5}>
              <SectionCard icon="fa-hand-holding-heart" title="Cães apadrinhados" subtitle="Acompanhe os interesses de apadrinhamento enviados com esta conta.">
                {apadrinhamentos.length === 0 ? (
                  <div className="text-center text-muted py-4">
                    <i className="fas fa-hand-holding-heart fa-2x opacity-50 mb-3 d-block"></i>
                    <span className="small d-block mb-3">Você ainda não enviou um interesse de apadrinhamento.</span>
                    <Link className="btn btn-primary btn-sm" to="/catalogo">Conhecer cães disponíveis</Link>
                  </div>
                ) : (
                  apadrinhamentos.map((item) => (
                    <div key={item.id} className="d-flex align-items-center gap-3 py-3 border-bottom">
                      {item.pet?.urlFoto ? <img src={item.pet.urlFoto} alt={item.petName} style={{ width: 64, height: 64, objectFit: "cover", borderRadius: 14 }} /> : <span className="d-grid place-items-center rounded-3" style={{ width: 64, height: 64, background: 'var(--primary-soft)', color: 'var(--primary-color)' }}><i className="fas fa-dog" /></span>}
                      <div className="flex-grow-1">
                        <div className="fw-semibold" style={{ color: "var(--text-color)" }}>
                          {item.petName}
                        </div>
                        <div className="text-muted small">R$ {item.amount}/mês · {item.status === 'ativo' ? 'Ativo' : item.status === 'pausado' ? 'Pausado' : 'Aguardando contato'}</div>
                        {item.pet && <Link className="small fw-semibold text-decoration-none" to={`/pets/${item.petId}`} state={{ pet: item.pet }}>Ver perfil do cão</Link>}
                      </div>
                    </div>
                  ))
                )}
              </SectionCard>

            </Col>
          </Row>
        </Container>
      </main>
      <Footer />
    </>
  );
};

export default Perfil;
