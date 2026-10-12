import { useEffect } from 'react';
import { getAdoptionWhatsAppUrl } from '../../utils/adoptionWhatsApp';

const PetModal = ({ pet, show, onClose }) => {

    useEffect(() => {
        const handleEscape = (e) => {
            if (e.key === 'Escape') onClose?.();
        };
        window.addEventListener('keydown', handleEscape);
        return () => window.removeEventListener('keydown', handleEscape);
    }, [onClose]);

    const isVisible = show !== undefined ? show : !!pet;
    if (!isVisible || !pet) return null;

    // Aceita os formatos usados pelos dados iniciais e pelo formulário local.
    const foto = pet.urlFoto || pet.url_foto || pet.foto;
    const genero = pet.genero || pet.sexo;

    return (
        <div
            className="modal fade show d-block"
            style={{ backgroundColor: 'rgba(0,0,0,0.5)' }}
            tabIndex={-1}
            role="dialog"
            aria-modal="true"
            aria-labelledby="pet-modal-title"
            onClick={onClose}
        >
            <div
                className="modal-dialog modal-dialog-centered modal-lg"
                onClick={(e) => e.stopPropagation()}
            >
                <div className="modal-content border-0 shadow rounded-4 overflow-hidden">
                    <div className="modal-header border-0">
                        <h5 id="pet-modal-title" className="modal-title ms-3 fw-bold">{pet.nome}</h5>
                        <button type="button" className="btn-close" onClick={onClose}></button>
                    </div>
                    <div className="modal-body">
                        <div className="row g-4">
                            <div className="col-md-6">
                                <div className="ratio ratio-1x1 rounded-4 overflow-hidden bg-light">
                                    {foto ? (
                                        <img src={foto} className="w-100 h-100 object-fit-cover" alt={pet.nome} />
                                    ) : (
                                        <div className="d-flex align-items-center justify-content-center text-muted">
                                            <i className="fas fa-paw fa-3x opacity-25"></i>
                                        </div>
                                    )}
                                </div>
                            </div>
                            <div className="col-md-6 d-flex flex-column">
                                <div className="d-flex flex-wrap gap-2 mb-3">
                                    {pet.especie && <span className="badge bg-warning text-dark text-capitalize">{pet.especie}</span>}
                                    {genero && <span className="badge bg-warning text-dark text-capitalize">{genero}</span>}
                                    {pet.idade && <span className="badge bg-warning text-dark text-capitalize">{pet.idade}</span>}
                                </div>

                                {(pet.vacinado || pet.castrado || pet.vermifugado) && (
                                    <div className="mb-3">
                                        <div className="small fw-bold text-muted mb-2">Cuidados veterinários</div>
                                        <div className="d-flex flex-wrap gap-2">
                                            {pet.vacinado && <span className="badge rounded-pill bg-success-subtle text-success"><i className="fas fa-check me-1"></i>Vacinado</span>}
                                            {pet.castrado && <span className="badge rounded-pill bg-success-subtle text-success"><i className="fas fa-check me-1"></i>Castrado</span>}
                                            {pet.vermifugado && <span className="badge rounded-pill bg-success-subtle text-success"><i className="fas fa-check me-1"></i>Vermifugado</span>}
                                        </div>
                                    </div>
                                )}

                                <p className="text-muted flex-grow-1">{pet.descricao}</p>
                                <hr />
                                <button
                                    type="button"
                                    className="btn btn-outline-warning bg-ligth w-100 fw-bold  rounded-lg"
                                    onClick={() => window.open(getAdoptionWhatsAppUrl(pet.nome), '_blank', 'noopener,noreferrer')}
                                >
                                    Quero Adotar
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default PetModal;
