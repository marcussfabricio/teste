import { useMemo, useState } from 'react';
import { Card, Col, Row } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import AdminLayout from '../../components/Layout/AdminLayout';
import ManagementTable from '../../components/Admin/ManagementTable';
import { getSponsorships, updateSponsorshipStatus } from '../../services/sponsorshipService';
import { showSuccess } from '../../utils/swalHelper';

const AdminSponsorships = () => {
  const navigate = useNavigate();
  const [items, setItems] = useState(getSponsorships);

  const totals = useMemo(() => ({
    active: items.filter((item) => item.status === 'ativo').length,
    pending: items.filter((item) => item.status === 'pendente').length,
    monthly: items.filter((item) => item.status === 'ativo').reduce((sum, item) => sum + Number(item.amount || 0), 0),
  }), [items]);

  const updateStatus = (id, status) => {
    setItems(updateSponsorshipStatus(id, status));
    showSuccess(status === 'ativo' ? 'Apadrinhamento ativado' : 'Apadrinhamento pausado');
  };

  const handleNav = (key) => navigate(key === 'overview' || key === 'pets' ? '/admin' : `/admin/${key}`);

  return (
    <AdminLayout active="apadrinhamentos" onSelect={handleNav}>
      <div className="mb-4">
        <span className="text-uppercase fw-bold small" style={{ color: 'var(--primary-color)', letterSpacing: '.1em' }}>Gestão de apoio</span>
        <h1 className="h2 fw-bold mt-2 mb-2">Apadrinhamentos</h1>
        <p className="text-muted mb-0">Acompanhe padrinhos, cães apoiados, valores mensais e contatos pendentes.</p>
      </div>

      <Row className="g-3 mb-4">
        <Col xs={12} md={4}><Card className="border-0 shadow-sm rounded-4 h-100"><Card.Body><small className="text-muted">Ativos</small><div className="h3 fw-bold mb-0 mt-2" style={{ color: 'var(--primary-color)' }}>{totals.active}</div></Card.Body></Card></Col>
        <Col xs={12} md={4}><Card className="border-0 shadow-sm rounded-4 h-100"><Card.Body><small className="text-muted">Aguardando contato</small><div className="h3 fw-bold mb-0 mt-2" style={{ color: 'var(--secondary-color)' }}>{totals.pending}</div></Card.Body></Card></Col>
        <Col xs={12} md={4}><Card className="border-0 shadow-sm rounded-4 h-100"><Card.Body><small className="text-muted">Apoio mensal ativo</small><div className="h3 fw-bold mb-0 mt-2" style={{ color: 'var(--primary-color)' }}>R$ {totals.monthly}</div></Card.Body></Card></Col>
      </Row>

      <ManagementTable activeTab="apadrinhamentos" showTabs={false} sponsorships={items} onSponsorshipStatus={updateStatus} />
    </AdminLayout>
  );
};

export default AdminSponsorships;
