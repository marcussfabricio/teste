import { Row, Col } from 'react-bootstrap';

const StepGuide = () => {
  const passos = [
    {
      numero: '01',
      titulo: 'Documente',
      descricao: 'Fotos, vídeos e o endereço exato com ponto de referência são fundamentais para que a polícia possa agir.'
    },
    {
      numero: '02',
      titulo: 'Detalhe',
      descricao: 'Relate com precisão: há privação de alimento? O animal está acorrentado ou sem abrigo contra sol e chuva?'
    },
    {
      numero: '03',
      titulo: 'Formalize',
      descricao: 'Registre a ocorrência pela Delegacia Virtual ou presencialmente. Redes sociais não substituem os canais oficiais.'
    }
  ];

  return (
    <div className="py-5">
      <div className="text-center mb-5">
        <h6 className="text-primary fw-bold text-uppercase ls-2 small mb-2">Procedimento</h6>
        <h2 className="fw-bold text-dark">Como denunciar corretamente</h2>
      </div>

      <Row className="g-0">
        {passos.map((passo, index) => (
          <Col md={4} key={index} className="mb-4 mb-md-0">
            <div 
              className={`h-100 p-4 ${index !== 2 ? 'border-end-md' : ''}`}
              style={{ borderLeft: '3px solid #e5e7eb' }}
            >
              <div className="display-5 fw-bold text-primary opacity-25 mb-3">
                {passo.numero}
              </div>
              <h4 className="fw-bold mb-3">{passo.titulo}</h4>
              <p className="text-muted lh-base mb-0">
                {passo.descricao}
              </p>
            </div>
          </Col>
        ))}
      </Row>
    </div>
  );
};

export default StepGuide;
