import { Link } from "react-router-dom";
import PetCard from "./PetCard";


const DogSection = ({ pets }) => {
  // Em vez de retornar null, verificamos dentro do return
  return (
    <section className="pet-showcase-section py-4 py-md-5 bg-light rounded-4 shadow-sm my-4">
      <div className="container">
        <div className="d-flex align-items-center mb-3 mb-md-4">
          <h2 className="pet-section-title fw-bold mb-0">
            <i className="fas fa-dog me-2 text-warning"></i> Cães para Adoção
          </h2>
          <div className="ms-3 flex-grow-1" style={{ borderBottom: '1px solid var(--primary-color)' }}></div>
        </div>

        {!pets || pets.length === 0 ? (
          <div className="text-center py-5 bg-light rounded-4 border">
            <div className="mb-3">
              <i className="fas fa-paw fa-3x text-muted opacity-50"></i>
            </div>
            <h3 className="h4 text-muted fw-bold">Nenhum cãozinho por aqui no momento!</h3>
            <p className="text-muted">
              Parece que todos os nossos amigos encontraram um lar ou estão em processo de adoção. 
              <br />Volte mais tarde para conhecer novos cães disponíveis.
            </p>
          </div>
        ) : (
          <div className="row g-3 g-md-4 home-pet-rail">
            {pets.map(pet => (
              <PetCard key={pet.id} pet={pet} />
            ))}
          </div>
        )}

        {/* Leva ao catálogo já filtrado por cães */}
        <div className="text-center mt-2">
          <Link
            to="/catalogo?especie=Cachorro"
            className="btn btn-outline-primary fw-bold rounded-3 px-3 py-2"
          >
            Ver Todos os Cães <i className="fas fa-arrow-right ms-2"></i>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default DogSection;
