import { useState } from "react";
import { Card, Button, InputGroup, Form } from "react-bootstrap";

const cap = (s) => (s ? s.charAt(0).toUpperCase() + s.slice(1) : s);

const Thumb = ({ url, nome }) => (
    <div className="admin-thumb rounded-circle bg-light d-flex align-items-center justify-content-center overflow-hidden flex-shrink-0 text-secondary fw-semibold" style={{ fontSize: "0.8rem" }}>
        {url ? <img src={url} alt={nome} className="w-100 h-100" style={{ objectFit: "cover" }} /> : (nome?.[0]?.toUpperCase() || "?")}
    </div>
);

const ActionBtn = ({ icon, color, title, onClick }) => (
    <button type="button" className={`btn btn-light btn-sm rounded-circle border-0 ${color}`} title={title} style={{ width: 32, height: 32 }} onClick={onClick}>
        <i className={`fas ${icon} fa-xs`} aria-hidden="true"></i>
    </button>
);

const tabStyle = (on) => ({
    color: on ? "var(--primary-color)" : "#9aa6b2",
    borderBottom: on ? "2px solid var(--primary-color)" : "2px solid transparent",
});

const StatusBadge = ({ adotado }) => (
    <span className={`badge rounded-pill ${adotado ? "bg-secondary-subtle text-secondary" : "bg-success-subtle text-success"}`}>
        {adotado ? "Adotado" : "Disponível"}
    </span>
);

const SponsorshipBadge = ({ status }) => {
    const styles = {
        ativo: 'bg-success-subtle text-success',
        pendente: 'bg-warning-subtle text-warning-emphasis',
        pausado: 'bg-secondary-subtle text-secondary',
    };
    const labels = { ativo: 'Ativo', pendente: 'Pendente', pausado: 'Pausado' };
    return <span className={`badge rounded-pill ${styles[status] || styles.pendente}`}>{labels[status] || 'Pendente'}</span>;
};

const ManagementTable = ({
    activeTab, onTabChange, pets = [], sponsorships = [],
    onViewPet,
    onAddPet, onEditPet, onDeletePet, onAdoptPet,
    onSponsorshipStatus,
    showTabs = true,
}) => {
    const isPets = activeTab === "pets";
    const isSponsorship = activeTab === "apadrinhamentos";
    const [busca, setBusca] = useState("");

    // Busca por cão, padrinho ou contato.
    const termo = busca.trim().toLowerCase();
    const petsFiltrados = termo ? pets.filter((p) => p.nome?.toLowerCase().includes(termo)) : pets;
    const apadrinhamentosFiltrados = termo
        ? sponsorships.filter((item) => [item.sponsorName, item.petName, item.email, item.phone].some((value) => String(value || '').toLowerCase().includes(termo)))
        : sponsorships;
    const listaFiltrada = isPets ? petsFiltrados : apadrinhamentosFiltrados;

    return (
        <Card className="border-0 shadow-sm rounded-4">
            <Card.Body className="p-3">
                <div className="d-flex align-items-center justify-content-between flex-wrap gap-2 mb-2">
                    {showTabs && <div className="d-flex gap-4">
                        <button type="button" className="btn btn-link text-decoration-none p-0 pb-2 fw-semibold" style={tabStyle(isPets)} onClick={() => onTabChange("pets")}>Cães</button>
                        <button type="button" className="btn btn-link text-decoration-none p-0 pb-2 fw-semibold" style={tabStyle(isSponsorship)} onClick={() => onTabChange("apadrinhamentos")}>Apadrinhamentos</button>
                    </div>}
                    {!showTabs && <strong style={{ color: '#2b3440' }}>{isPets ? 'Cães cadastrados' : 'Todos os apadrinhamentos'}</strong>}
                    {isPets && <Button size="sm" className="text-white fw-semibold" style={{ backgroundColor: "var(--primary-color)", border: "none" }} onClick={onAddPet}>
                        <i className="fas fa-plus me-1" aria-hidden="true"></i> Adicionar cão
                    </Button>}
                </div>

                {/* Busca por nome/título */}
                <InputGroup size="sm" className="mb-3" style={{ maxWidth: 360 }}>
                    <InputGroup.Text className="bg-white border-end-0" ><i className="fas fa-magnifying-glass text-muted"></i></InputGroup.Text>
                    <Form.Control
                        className="border-start-0"
                        placeholder={isPets ? "Buscar cão..." : "Buscar padrinho ou cão..."}
                        value={busca}
                        onChange={(e) => setBusca(e.target.value)}
                    />
                    {busca && (
                        <Button variant="outline-secondary" onClick={() => setBusca("")} title="Limpar"><i className="fas fa-xmark"></i></Button>
                    )}
                </InputGroup>

                {listaFiltrada.length === 0 ? (
                    <p className="text-muted small text-center py-4 mb-0">
                        {termo ? "Nenhum resultado para a busca." : "Nenhum registro encontrado."}
                    </p>
                ) : isPets ? (
                    petsFiltrados.map((p) => {
                        const adotado = p.status === "adotado";
                        return (
                            <div key={p.id} className="row align-items-center g-2 py-2 border-bottom mx-0">
                                <div className="col-7 col-md-5 d-flex align-items-center gap-3 admin-rowname" style={{ minWidth: 0 }} onClick={() => onViewPet?.(p)} title="Ver detalhes">
                                    <Thumb url={p.urlFoto || p.url_foto} nome={p.nome} />
                                    <div style={{ minWidth: 0 }}>
                                        <div className="fw-medium text-truncate admin-rowname-title" style={{ color: "#2b3440" }}>{p.nome}</div>
                                        <small className="text-muted d-md-none">{cap(p.especie)} · {adotado ? "Adotado" : "Disponível"}</small>
                                    </div>
                                </div>
                                <div className="col-md-3 d-none d-md-block text-muted">{cap(p.especie)}</div>
                                <div className="col-md-2 d-none d-md-block"><StatusBadge adotado={adotado} /></div>
                                <div className="col-5 col-md-2 d-flex justify-content-end align-items-center gap-2">
                                    {!adotado && <ActionBtn icon="fa-check" color="text-success" title="Marcar como adotado" onClick={() => onAdoptPet(p)} />}
                                    <ActionBtn icon="fa-pencil-alt" color="text-primary" title="Editar" onClick={() => onEditPet(p)} />
                                    <ActionBtn icon="fa-trash-alt" color="text-danger" title="Excluir" onClick={() => onDeletePet(p.id)} />
                                </div>
                            </div>
                        );
                    })
                ) : (
                    apadrinhamentosFiltrados.map((item) => (
                        <div key={item.id} className="row align-items-center g-2 py-3 border-bottom mx-0">
                            <div className="col-7 col-md-4 d-flex align-items-center gap-3" style={{ minWidth: 0 }}>
                                <div className="admin-thumb rounded-circle d-flex align-items-center justify-content-center flex-shrink-0" style={{ background: 'var(--secondary-soft)', color: 'var(--secondary-color)' }}><i className="fas fa-hand-holding-heart" /></div>
                                <div style={{ minWidth: 0 }}>
                                    <div className="fw-semibold text-truncate" style={{ color: "#2b3440" }}>{item.sponsorName}</div>
                                    <small className="text-muted">{item.email}</small>
                                </div>
                            </div>
                            <div className="col-md-2 d-none d-md-block"><strong style={{ color: '#2b3440' }}>{item.petName}</strong><small className="d-block text-muted">Afilhado</small></div>
                            <div className="col-md-2 d-none d-md-block"><strong style={{ color: 'var(--primary-color)' }}>R$ {item.amount}/mês</strong><small className="d-block text-muted">Desde {item.since}</small></div>
                            <div className="col-5 col-md-2"><SponsorshipBadge status={item.status} /><small className="d-block text-muted mt-1">{item.lastContact}</small></div>
                            <div className="col-12 col-md-2 d-flex justify-content-end align-items-center gap-2">
                                {item.status !== 'ativo' && <ActionBtn icon="fa-check" color="text-success" title="Ativar apadrinhamento" onClick={() => onSponsorshipStatus(item.id, 'ativo')} />}
                                {item.status === 'ativo' && <ActionBtn icon="fa-pause" color="text-warning" title="Pausar apadrinhamento" onClick={() => onSponsorshipStatus(item.id, 'pausado')} />}
                                <a className="btn btn-light btn-sm rounded-circle border-0 text-primary d-grid place-items-center" style={{ width: 32, height: 32 }} href={`mailto:${item.email}`} title="Enviar e-mail"><i className="fas fa-envelope fa-xs" /></a>
                            </div>
                        </div>
                    ))
                )}
            </Card.Body>
        </Card>
    );
};

export default ManagementTable;
