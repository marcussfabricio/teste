import { Card, Button } from "react-bootstrap";

const cap = (s) => (s ? s.charAt(0).toUpperCase() + s.slice(1) : s);
const loadedAt = Date.now();

const Avatar = ({ foto, nome }) => (
    <div
        className="rounded-4 d-flex align-items-center justify-content-center flex-shrink-0 overflow-hidden text-white fw-bold"
        style={{ width: 60, height: 60, backgroundColor: "var(--primary-color)", fontSize: "1.6rem" }}
    >
        {foto ? <img src={foto} alt={nome} className="w-100 h-100" style={{ objectFit: "cover" }} /> : (nome?.[0]?.toUpperCase() || <i className="fas fa-paw" aria-hidden="true"></i>)}
    </div>
);

const Label = () => (
    <div className="fw-semibold" style={{ fontSize: "0.7rem", color: "var(--primary-color)", letterSpacing: "0.5px" }}>
        <i className="fas fa-hourglass-half me-1" aria-hidden="true"></i> AGUARDANDO HÁ MAIS TEMPO
    </div>
);

// Destaque: pet disponível que está há mais tempo no abrigo.
const FeaturedPet = ({ pet, onView }) => {
    if (!pet) {
        return (
            <Card className="border shadow-sm rounded-4 mb-4" style={{ backgroundColor: "#fff8ef", borderColor: "#f7e2c0" }}>
                <Card.Body className="d-flex align-items-center gap-3">
                    <Avatar nome={null} />
                    <div>
                        <Label />
                        <h2 className="fw-bold mb-0" style={{ fontSize: "1.05rem", color: "#2b3440" }}>Nenhum cão disponível no momento</h2>
                        <div className="text-muted small">Cadastre um novo cão para começar.</div>
                    </div>
                </Card.Body>
            </Card>
        );
    }

    const dias = pet.criadoEm ? Math.max(0, Math.floor((loadedAt - new Date(pet.criadoEm).getTime()) / 86400000)) : null;
    const desde = pet.criadoEm ? new Date(pet.criadoEm).toLocaleDateString("pt-BR", { day: "numeric", month: "long" }) : "";

    return (
        <Card className="border shadow-sm rounded-4 mb-4" style={{ backgroundColor: "#fff8ef", borderColor: "#f7e2c0" }}>
            <Card.Body className="d-flex align-items-center gap-3 flex-wrap">
                <Avatar foto={pet.urlFoto || pet.url_foto} nome={pet.nome} />
                <div className="flex-grow-1" style={{ minWidth: 0 }}>
                    <Label />
                    <h2 className="fw-bold mb-1" style={{ fontSize: "1.1rem", color: "#2b3440" }}>{pet.nome} está esperando por um lar</h2>
                    <div className="text-muted small">
                        {cap(pet.especie)} · {cap(pet.genero)} · {pet.idade}{desde ? ` · no abrigo desde ${desde}` : ""}
                    </div>
                </div>
                <div className="text-center flex-shrink-0">
                    {dias != null && (
                        <span className="d-block text-white fw-bold rounded-3 px-3 py-2" style={{ backgroundColor: "var(--primary-color)" }}>
                            {dias} {dias === 1 ? "dia" : "dias"}
                        </span>
                    )}
                    <Button variant="link" className="p-0 mt-2 small text-decoration-none" style={{ color: "var(--secondary-color)" }} onClick={() => onView?.(pet)}>
                        Ver perfil <i className="fas fa-arrow-right" aria-hidden="true"></i>
                    </Button>
                </div>
            </Card.Body>
        </Card>
    );
};

export default FeaturedPet;
