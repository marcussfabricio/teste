import { useEffect, useState } from "react";
import { Row, Col, Card } from "react-bootstrap";
import { getDashboardDataAdmin } from "../../services/statsService";

const KpiCards = () => {
    const [stats, setStats] = useState({});

    useEffect(() => {
        let ativo = true;
        getDashboardDataAdmin()
            .then((data) => {
                if (!ativo) return;
                setStats(data || {});
            })
            .catch((err) => {
                console.error("Erro ao buscar estatísticas:", err);
            });
        return () => { ativo = false; };
    }, []);

    const cards = [
        { label: "Disponíveis", value: stats.petsDisponiveis, icon: "fa-house", color: "var(--primary-color)" },
        { label: "Adotados", value: stats.petsAdotados, icon: "fa-heart", color: "var(--secondary-color)" },
        { label: "Total de cães", value: stats.totalPetsHistorico, icon: "fa-paw", color: "var(--primary-color)" },
    ];

    return (
        <Row className="g-3 mb-3">
            {cards.map((c) => (
                <Col xs={12} sm={4} key={c.label}>
                    <Card className="border-0 shadow-sm rounded-4 h-100">
                        <Card.Body className="p-3">
                            <div className="d-flex align-items-center gap-2 text-muted small">
                                <i className={`fas ${c.icon}`} style={{ color: c.color }} aria-hidden="true"></i> {c.label}
                            </div>
                            <div className="fw-bold mt-1" style={{ fontSize: "1.6rem", color: "#2b3440" }}>{c.value ?? 0}</div>
                        </Card.Body>
                    </Card>
                </Col>
            ))}
        </Row>
    );
};

export default KpiCards;
