import { useMemo, useState } from 'react';
import { Form, Spinner } from 'react-bootstrap';
import { Link, useLocation, useParams } from 'react-router-dom';
import Navbar from '../../components/Layout/Navbar';
import Footer from '../../components/Layout/Footer';
import { useAuth } from '../../context/AuthContext';
import { getAllPets } from '../../services/petService';
import fallbackLogo from '../../assets/images/logo.png';
import { createSponsorshipInterest } from '../../services/sponsorshipService';
import './Sponsorship.css';

const plans = [
  { value: 30, title: 'Amigo', text: 'Ajuda com alimentação e itens de higiene.' },
  { value: 60, title: 'Companheiro', text: 'Contribui também com vacinas e medicamentos.', featured: true },
  { value: 100, title: 'Protetor', text: 'Fortalece o cuidado completo e a manutenção do abrigo.' },
];

const Sponsorship = () => {
  const { id } = useParams();
  const location = useLocation();
  const { user } = useAuth() || {};
  const localPet = getAllPets().find((item) => String(item.id) === String(id) && (!item.status || item.status === 'disponivel'));
  const [pet] = useState(location.state?.pet || localPet || null);
  const [loading] = useState(false);
  const [plan, setPlan] = useState(60);
  const [submitted, setSubmitted] = useState(false);
  const [form, setForm] = useState({
    name: user?.nomeCompleto || user?.nome || '',
    email: user?.email || '',
    phone: user?.telefone || '',
    message: '',
    consent: false,
  });


  const valid = useMemo(() => form.name.trim() && form.email.trim() && form.phone.trim() && form.consent, [form]);
  const set = (field, value) => setForm((current) => ({ ...current, [field]: value }));
  const submit = (event) => {
    event.preventDefault();
    if (!valid) return;
    createSponsorshipInterest({ sponsorName: form.name.trim(), email: form.email.trim(), phone: form.phone.trim(), petName: pet.nome, petId: pet.id, amount: plan, message: form.message.trim() });
    setSubmitted(true);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  if (loading) return <><Navbar /><main className="sponsor-state"><Spinner animation="border" /></main><Footer /></>;
  if (!pet) return <><Navbar /><main className="sponsor-state"><i className="fas fa-dog" /><h1>Cão não encontrado</h1><Link className="btn btn-primary" to="/catalogo">Ver cães disponíveis</Link></main><Footer /></>;

  const photo = pet.urlFoto || pet.url_foto || pet.foto || fallbackLogo;

  if (submitted) {
    return (
      <><Navbar /><main className="sponsor-page"><div className="sponsor-success"><span><i className="fas fa-heart" /></span><p>Apadrinhamento de {pet.nome}</p><h1>Cadastro salvo neste navegador.</h1><p>Seu interesse no plano de R$ {plan} por mês aparece no painel administrativo local. Para falar com o abrigo, use os canais oficiais de contato.</p><div><Link className="btn btn-primary" to={`/pets/${pet.id}`} state={{ pet }}>Voltar para {pet.nome}</Link><Link className="btn btn-outline-primary" to="/home">Ir para o início</Link></div></div></main><Footer /></>
    );
  }

  return (
    <>
      <Navbar />
      <main className="sponsor-page">
        <div className="container sponsor-container">
          <div className="sponsor-heading">
            <Link to={`/pets/${pet.id}`} state={{ pet }}><i className="fas fa-arrow-left" /> Voltar para {pet.nome}</Link>
            <span>Apadrinhe um cão</span>
            <h1>Faça parte da história de {pet.nome}</h1>
            <p>Escolha uma faixa de apoio e envie seu interesse. A equipe do abrigo entrará em contato para orientar a contribuição.</p>
          </div>

          <section className="sponsor-dog-card">
            <img src={photo} alt={`Foto de ${pet.nome}`} />
            <div><small>Seu futuro afilhado</small><h2>{pet.nome}</h2><p>{pet.genero} • {pet.idade} • Porte {pet.porte || 'médio'}</p></div>
            <span><i className="fas fa-paw" /></span>
          </section>

          <Form className="sponsor-content" onSubmit={submit}>
            <div className="sponsor-main">
              <section className="sponsor-block">
                <div className="sponsor-step"><span>1</span><div><h2>Escolha seu plano mensal</h2><p>Todo valor ajuda diretamente nos cuidados dos cães.</p></div></div>
                <div className="sponsor-plans">
                  {plans.map((item) => (
                    <button type="button" key={item.value} className={`sponsor-plan ${plan === item.value ? 'is-selected' : ''}`} onClick={() => setPlan(item.value)} aria-pressed={plan === item.value}>
                      {item.featured && <em>Mais escolhido</em>}
                      <span className="sponsor-radio"><i /></span>
                      <strong>{item.title}</strong>
                      <b><small>R$</small>{item.value}<small>/mês</small></b>
                      <p>{item.text}</p>
                    </button>
                  ))}
                </div>
              </section>

              <section className="sponsor-block">
                <div className="sponsor-step"><span>2</span><div><h2>Seus dados</h2><p>Usaremos estas informações para entrar em contato sobre o apadrinhamento.</p></div></div>
                <div className="sponsor-form-grid">
                  <Form.Group><Form.Label>Nome completo</Form.Label><Form.Control value={form.name} onChange={(e) => set('name', e.target.value)} placeholder="Como podemos chamar você?" required /></Form.Group>
                  <Form.Group><Form.Label>E-mail</Form.Label><Form.Control type="email" value={form.email} onChange={(e) => set('email', e.target.value)} placeholder="seuemail@exemplo.com" required /></Form.Group>
                  <Form.Group><Form.Label>Telefone / WhatsApp</Form.Label><Form.Control value={form.phone} onChange={(e) => set('phone', e.target.value)} placeholder="(47) 99999-9999" required /></Form.Group>
                  <Form.Group className="sponsor-field-full"><Form.Label>Mensagem para {pet.nome} <small>(opcional)</small></Form.Label><Form.Control as="textarea" rows={3} value={form.message} onChange={(e) => set('message', e.target.value)} placeholder="Escreva uma mensagem carinhosa para o seu afilhado." /></Form.Group>
                </div>
                <Form.Check id="sponsor-consent" checked={form.consent} onChange={(e) => set('consent', e.target.checked)} label="Autorizo o Abrigo Animal Joinville a entrar em contato sobre este apadrinhamento." />
              </section>
            </div>

            <aside className="sponsor-summary">
              <p>Resumo do apadrinhamento</p>
              <div><img src={photo} alt="" /><span><small>Afilhado</small><strong>{pet.nome}</strong></span></div>
              <ul><li>Plano mensal <strong>R$ {plan},00</strong></li><li>Periodicidade <strong>Mensal</strong></li></ul>
              <button type="submit" className="btn btn-primary" disabled={!valid}>Enviar interesse <i className="fas fa-arrow-right" /></button>
              <small>O envio não realiza cobrança. A contribuição será combinada diretamente com a equipe.</small>
              <small><i className="fas fa-shield-halved" /> Seus dados serão usados somente pelo abrigo.</small>
            </aside>
          </Form>
        </div>
      </main>
      <Footer />
    </>
  );
};

export default Sponsorship;
