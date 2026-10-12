import { Card, Row, Col, Button } from 'react-bootstrap';
import policeLogo from '../../assets/images/logo-policia.png';

const OfficialChannel = () => {
  return (
    <section className="my-5">
      <Card className="bg-dark text-white border-0 shadow-lg rounded-4 overflow-hidden">
        <Card.Body className="p-4 p-md-5">
          <Row className="align-items-center">
            {/* Marca oficial disponibilizada nos arquivos do projeto */}
            <Col lg={2} className="text-center mb-4 mb-lg-0">
              <img 
                src={policeLogo}
                alt="Polícia Civil de Santa Catarina" 
                className="img-fluid"
                style={{ 
                  maxHeight: '110px',
                  width: 'auto',
                  objectFit: 'contain'
                }}
              />
            </Col>

            {/* Texto Informativo */}
            <Col lg={6} className="ps-lg-5">
              <h3 className="fw-bold mb-3">Delegacia Virtual de Santa Catarina</h3>
              <p className="lead fs-6 opacity-75 mb-0">
                Este é o canal oficial da Polícia Civil (PCSC) para registrar crimes de maus-tratos 
                contra animais ou enviar uma denúncia anônima. Após o envio, acompanhe as orientações e o protocolo fornecido pelo órgão.
              </p>
            </Col>

            {/* Ação Principal */}
            <Col lg={4} className="text-lg-end mt-4 mt-lg-0">
              <Button 
                variant="primary" 
                size="lg" 
                href="https://delegaciavirtual.sc.gov.br/" 
                target="_blank"
                rel="noopener noreferrer"
                className="rounded-pill px-5 py-3 fw-bold shadow-sm"
              >
                Registrar Denúncia <i className="fas fa-external-link-alt ms-2 small"></i>
              </Button>
            </Col>
          </Row>
        </Card.Body>
      </Card>
      
      {/* Nota de rodapé do card para passar credibilidade */}
      <div className="text-center mt-3">
        <small className="text-muted">
          <i className="fas fa-info-circle me-2"></i>
          Se preferir, o registro também pode ser feito presencialmente em uma delegacia.
        </small>
      </div>
    </section>
  );
};

export default OfficialChannel;
