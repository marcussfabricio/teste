import { Container } from 'react-bootstrap';

const AdminFooter = () => {
    return (
        <footer className="py-3 mt-auto border-top bg-white">
            <Container fluid className="px-4">
                <div className="d-flex align-items-center justify-content-between gap-3 flex-wrap small">
                    <div className="text-muted">
                        &copy; 2026 <strong>Abrigo Animal Joinville</strong> — Gestão Institucional
                    </div>

                    <span className="badge bg-success-subtle text-success border border-success-subtle rounded-pill">
                        <i className="bi bi-device-hdd me-1"></i> Dados salvos neste navegador
                    </span>
                </div>
            </Container>
        </footer>
    );
};

export default AdminFooter;
