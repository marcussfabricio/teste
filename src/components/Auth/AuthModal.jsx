import { useState } from 'react';
import { Modal, Form, Button, Alert, Spinner } from 'react-bootstrap';

const EMPTY = { nomeCompleto: '', email: '', telefone: '', senha: '', confirmarSenha: '' };

const AuthModal = ({ show, initialTab = 'login', onClose, onLogin, onRegister }) => {
  const [tab, setTab] = useState(initialTab);
  const [form, setForm] = useState(EMPTY);
  const [erro, setErro] = useState('');
  const [busy, setBusy] = useState(false);
  const isLogin = tab === 'login';
  const changeTab = (next) => { setTab(next); setErro(''); };
  const submit = async (event) => {
    event.preventDefault();
    setErro('');
    if (!isLogin && form.senha !== form.confirmarSenha) { setErro('As senhas não coincidem.'); return; }
    setBusy(true);
    try {
      if (isLogin) await onLogin(form);
      else await onRegister(form);
      setForm(EMPTY);
    } catch (error) { setErro(error.message); }
    finally { setBusy(false); }
  };
  return <Modal show={show} onHide={onClose} centered><Modal.Header closeButton className="border-0 pb-0" /><Modal.Body className="px-4 pb-4 pt-2">
    <h4 className="fw-bold text-center mb-1">{isLogin ? 'Bem-vindo de volta' : 'Criar conta'}</h4>
    <p className="text-muted text-center small mb-3">Acesso local de demonstração. Seus dados ficam neste navegador.</p>
    {erro && <Alert variant="danger" className="py-2 small">{erro}</Alert>}
    <div className="d-flex gap-2 mb-3"><Button className="flex-fill" variant={isLogin ? 'primary' : 'outline-primary'} onClick={() => changeTab('login')}>Entrar</Button><Button className="flex-fill" variant={!isLogin ? 'primary' : 'outline-primary'} onClick={() => changeTab('register')}>Cadastrar</Button></div>
    <Form onSubmit={submit}>
      {!isLogin && <><Form.Group controlId="auth-name" className="mb-3"><Form.Label>Nome completo</Form.Label><Form.Control name="nomeCompleto" value={form.nomeCompleto} onChange={(e) => setForm({ ...form, nomeCompleto: e.target.value })} required /></Form.Group><Form.Group controlId="auth-phone" className="mb-3"><Form.Label>Telefone</Form.Label><Form.Control name="telefone" value={form.telefone} onChange={(e) => setForm({ ...form, telefone: e.target.value })} required /></Form.Group></>}
      <Form.Group controlId="auth-email" className="mb-3"><Form.Label>E-mail</Form.Label><Form.Control type="email" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} required /></Form.Group>
      <Form.Group controlId="auth-password" className="mb-3"><Form.Label>Senha</Form.Label><Form.Control type="password" value={form.senha} onChange={(e) => setForm({ ...form, senha: e.target.value })} minLength={6} required /></Form.Group>
      {!isLogin && <Form.Group controlId="auth-confirm-password" className="mb-3"><Form.Label>Confirmar senha</Form.Label><Form.Control type="password" value={form.confirmarSenha} onChange={(e) => setForm({ ...form, confirmarSenha: e.target.value })} minLength={6} required /></Form.Group>}
      <Button type="submit" className="w-100 fw-bold" disabled={busy}>{busy ? <Spinner size="sm" /> : isLogin ? 'Entrar' : 'Criar conta'}</Button>
    </Form>
    {isLogin && <div className="small mt-3 p-3 rounded-3 bg-light border"><strong className="d-block mb-2">Contas de demonstração</strong><div className="mb-1"><span className="text-muted">Painel:</span> admin@patudos.org <span aria-hidden="true">/</span> patudos123</div><div><span className="text-muted">Perfil:</span> adotante@abrigo.local <span aria-hidden="true">/</span> adotar123</div></div>}
  </Modal.Body></Modal>;
};
export default AuthModal;
