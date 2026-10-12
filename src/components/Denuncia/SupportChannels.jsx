import { Row, Col, Card } from 'react-bootstrap';

const SupportChannels = () => {
  const canais = [
    {
      titulo: 'Disque Denúncia 181',
      descricao: 'Canal anônimo da Polícia Civil para informações sobre crimes em andamento ou paradeiro de infratores.',
      icone: 'fa-shield-alt',
      href: 'tel:181',
      action: 'Ligar 181'
    },
    {
      titulo: 'Ministério Público (MPSC)',
      descricao: 'Indicado para denúncias de descaso continuado, crimes ambientais graves ou omissão de órgãos públicos.',
      icone: 'fa-balance-scale',
      href: 'https://www.mpsc.mp.br/ouvidoria',
      action: 'Acessar a Ouvidoria'
    },
    {
      titulo: 'IBAMA',
      descricao: 'Linha Verde (0800 061 8080) para infrações ambientais, inclusive casos envolvendo fauna silvestre.',
      icone: 'fa-leaf',
      href: 'https://www.gov.br/ibama/pt-br/assuntos/fiscalizacao-e-protecao-ambiental/fiscalizacao-ambiental/denuncias',
      action: 'Ver canais do Ibama'
    }
  ];

  return (
    <Row className="g-4">
      {canais.map((canal, index) => (
        <Col lg={4} key={index}>
          <Card className="h-100 border-light shadow-sm border-0 bg-light bg-opacity-50">
            <Card.Body className="p-4">
              <div className="d-flex align-items-start">
                <div className="text-muted mb-3 me-3">
                  <i className={`fa-solid ${canal.icone} fa-xl opacity-50`}></i>
                </div>
                <div>
                  <h6 className="fw-bold text-dark mb-2">{canal.titulo}</h6>
                  <p className="text-muted small mb-0 lh-base">
                    {canal.descricao}
                  </p>
                  <a className="d-inline-flex align-items-center gap-2 mt-3 fw-semibold text-decoration-none" href={canal.href} target={canal.href.startsWith('http') ? '_blank' : undefined} rel={canal.href.startsWith('http') ? 'noopener noreferrer' : undefined}>
                    {canal.action} <i className="fas fa-arrow-right" aria-hidden="true" />
                  </a>
                </div>
              </div>
            </Card.Body>
          </Card>
        </Col>
      ))}
    </Row>
  );
};

export default SupportChannels;
