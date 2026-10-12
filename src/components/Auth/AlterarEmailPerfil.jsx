import { Form } from 'react-bootstrap';
import { useAuth } from '../../context/AuthContext';

const AlterarEmailPerfil = () => {
  const { user } = useAuth();
  return <><Form.Label className="small fw-bold text-muted">E-mail</Form.Label><Form.Control value={user?.email || ''} readOnly aria-label="E-mail da conta local" /><Form.Text>Conta de demonstração local.</Form.Text></>;
};
export default AlterarEmailPerfil;
