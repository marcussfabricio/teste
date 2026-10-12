import { useNavigate } from "react-router-dom";
import { Button } from "react-bootstrap";

const hoje = () =>
    new Date().toLocaleDateString("pt-BR", { weekday: "long", day: "numeric", month: "long" });

const DashboardHeader = () => {
    const navigate = useNavigate();

    return (
        <div className="d-flex align-items-start justify-content-between flex-wrap gap-3 mb-4">
            <div>
                <h1 className="fw-bold mb-0" style={{ fontSize: "1.5rem", color: "#2b3440" }}>Bem-vindo de volta</h1>
                <p className="text-muted small mb-0 mt-1 d-flex align-items-center">
                    <span className="status-indicator status-online"></span>
                    Dados locais · {hoje()}
                </p>
            </div>

            <div className="d-flex gap-2 flex-wrap">
                <Button
                    onClick={() => navigate("/admin/post-pet")}
                    className="text-white"
                    style={{ backgroundColor: "var(--primary-color)", border: "none" }}
                >
                    <i className="fas fa-plus me-2" aria-hidden="true"></i>Adicionar cão
                </Button>
            </div>
        </div>
    );
};

export default DashboardHeader;
