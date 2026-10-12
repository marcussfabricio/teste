import { useNavigate } from 'react-router-dom';
import fallbackLogo from '../../assets/images/logo.png';
import './PetCard.css';

const PetCard = ({ pet }) => {
    const navigate = useNavigate();

    if (!pet) return null;

    const { nome = 'Amigo à espera de um lar', idade, genero, especie, urlFoto, url_foto } = pet;
    const foto = urlFoto || url_foto || fallbackLogo;

    const open = () => navigate(`/pets/${pet.id}`, { state: { pet } });

    const handleCardKeyDown = (e) => {
        if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            open();
        }
    };

    return (
        <div className="pet-card-column col-12 col-sm-6 col-xl-3 mb-3 mb-md-4">
            <div
                className="pet-card card h-100 border-0 position-relative overflow-hidden"
                role="button"
                tabIndex={0}
                onClick={open}
                onKeyDown={handleCardKeyDown}
                aria-label={`Ver detalhes de ${nome}`}
            >
                <div className="pet-card-media">
                    <img
                        src={foto}
                        className="pet-card-image"
                        alt={`Foto de ${nome}`}
                        loading="lazy"
                        onError={(event) => {
                            event.currentTarget.onerror = null;
                            event.currentTarget.src = fallbackLogo;
                            event.currentTarget.classList.add('pet-card-image--fallback');
                        }}
                    />
                    <span className="pet-card-status">
                        <i className="fas fa-house me-1" aria-hidden="true"></i>
                        Para adoção
                    </span>
                </div>

                <div className="card-body pet-card-body d-flex flex-column">
                    <h3 className="pet-card-name">{nome}</h3>
                    <div className="pet-card-traits" aria-label="Características do cão">
                        {especie && <span><i className="fas fa-paw" aria-hidden="true"></i>{especie}</span>}
                        {genero && <span><i className={`fas ${String(genero).toLowerCase().includes('f') ? 'fa-venus' : 'fa-mars'}`} aria-hidden="true"></i>{genero}</span>}
                        {idade && <span><i className="far fa-calendar" aria-hidden="true"></i>{idade}</span>}
                    </div>
                    
                    <button
                        type="button"
                        className="btn btn-primary pet-card-cta w-100 fw-bold mt-auto"
                        onClick={(e) => {
                            e.stopPropagation();
                            open();
                        }}
                    >
                        Conhecer {nome} <i className="fas fa-arrow-right ms-2" aria-hidden="true"></i>
                    </button>
                </div>
            </div>
        </div>
  );
};

export default PetCard;
