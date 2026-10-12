import { Card, Button, Row, Col } from 'react-bootstrap';

const EmergencyBanner = () => {
  return (
    <div className="position-relative" style={{ marginTop: '-45px', zIndex: '10' }}>
      <Row className="justify-content-center">
        <Col lg={10} xl={8}>
          <Card className="border-danger border-2 shadow-sm rounded-4 bg-white">
            <Card.Body className="p-4">
              <Row className="align-items-center">
                {/* Ícone de Alerta */}
                <Col xs={12} md={"auto"} className="text-center mb-3 mb-md-0">
                  <div 
                    className="bg-danger bg-opacity-10 text-danger rounded-circle d-flex align-items-center justify-content-center mx-auto"
                    style={{ width: '60px', height: '60px' }}
                  >
                    <i className="fa-solid fa-triangle-exclamation fa-xl"></i>
                  </div>
                </Col>

                {/* Texto de Urgência */}
                <Col xs={12} md className="text-center text-md-start ps-md-4">
                  <h4 className="fw-bold mb-1 text-dark">Situação de flagrante agora?</h4>
                  <p className="text-muted mb-0">
                    Não espere o registro online. Para casos de violência imediata, chame a Polícia Militar.
                  </p>
                </Col>

                {/* Botão de Chamada */}
                <Col xs={12} md={"auto"} className="text-center mt-3 mt-md-0">
                  <Button 
                    variant="danger" 
                    href="tel:190" 
                    className="fw-bold px-4 py-2 rounded-pill d-flex align-items-center justify-content-center mx-auto"
                  >
                    <i className="fa-solid fa-phone-flip me-2"></i>
                    LIGUE 190
                  </Button>
                </Col>
              </Row>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </div>
  );
};

export default EmergencyBanner;