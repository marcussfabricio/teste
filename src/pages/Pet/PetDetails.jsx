import { useState } from 'react';
import { Link, useLocation, useNavigate, useParams } from 'react-router-dom';
import { Container, Spinner } from 'react-bootstrap';
import Navbar from '../../components/Layout/Navbar';
import Footer from '../../components/Layout/Footer';
import { getAllPets } from '../../services/petService';
import fallbackLogo from '../../assets/images/logo.png';
import { getAdoptionWhatsAppUrl } from '../../utils/adoptionWhatsApp';
import './PetDetails.css';

const booleanLabel = (value) => value ? 'Sim' : 'Em acompanhamento';

const PetDetails = () => {
  const { id } = useParams();
  const location = useLocation();
  const navigate = useNavigate();
  const localPet = getAllPets().find((item) => String(item.id) === String(id) && (!item.status || item.status === 'disponivel'));
  const [pet] = useState(localPet || location.state?.pet || null);
  const [loading] = useState(false);

  if (loading) {
    return <><Navbar /><main className="pet-detail-loading"><Spinner animation="border" /></main><Footer /></>;
  }

  if (!pet) {
    return (
      <><Navbar /><main className="pet-detail-empty"><i className="fas fa-dog" /><h1>Cão não encontrado</h1><p>Este cão pode já ter encontrado uma família.</p><Link className="btn btn-primary" to="/catalogo">Ver cães disponíveis</Link></main><Footer /></>
    );
  }

  const photo = pet.urlFoto || pet.url_foto || pet.foto || fallbackLogo;
  const traits = [
    { icon: 'fa-venus-mars', label: 'Sexo', value: pet.genero || 'Não informado' },
    { icon: 'fa-cake-candles', label: 'Idade', value: pet.idade || 'Não informada' },
    { icon: 'fa-dog', label: 'Porte', value: pet.porte || 'Médio' },
    { icon: 'fa-bolt', label: 'Energia', value: pet.energia || 'Moderada' },
    { icon: 'fa-heart', label: 'Jeito', value: pet.sociabilidade || 'Carinhoso' },
  ];

  return (
    <>
      <Navbar />
      <main className="pet-detail-page">
        <Container>
          <button type="button" className="pet-detail-back" onClick={() => navigate(-1)}>
            <i className="fas fa-arrow-left" aria-hidden="true" /> Voltar
          </button>

          <section className="pet-detail-hero" aria-labelledby="pet-title">
            <div className="pet-detail-photo-wrap">
              <img src={photo} alt={`Foto de ${pet.nome}`} className="pet-detail-photo" />
              <span className="pet-detail-status"><i className="fas fa-house" /> Disponível para adoção</span>
            </div>

            <div className="pet-detail-summary">
              <p className="pet-detail-eyebrow">Conheça este amigo</p>
              <div className="pet-detail-title-row">
                <h1 id="pet-title">{pet.nome}</h1>
              </div>
              <p className="pet-detail-lead">{pet.descricao || `${pet.nome} está esperando uma família para compartilhar carinho, cuidado e muitos momentos felizes.`}</p>

              <div className="pet-detail-traits">
                {traits.map((trait) => (
                  <div className="pet-detail-trait" key={trait.label}>
                    <i className={`fas ${trait.icon}`} aria-hidden="true" />
                    <span><small>{trait.label}</small><strong>{trait.value}</strong></span>
                  </div>
                ))}
              </div>

              <div className="pet-detail-actions">
                <a className="btn btn-primary" href={getAdoptionWhatsAppUrl(pet.nome)} target="_blank" rel="noopener noreferrer">
                  <i className="fab fa-whatsapp" /> Quero adotar {pet.nome}
                </a>
                <Link className="btn btn-sponsor" to={`/apadrinhar/${pet.id}`} state={{ pet }}>
                  <i className="fas fa-hand-holding-heart" /> Apadrinhar {pet.nome}
                </Link>
              </div>
            </div>
          </section>

          <section className="pet-detail-grid">
            <article className="pet-detail-card">
              <span className="pet-detail-card-icon"><i className="fas fa-paw" /></span>
              <h2>Adoção responsável</h2>
              <p>A equipe do abrigo acompanha cada aproximação para que a adaptação seja segura para o cão e para a nova família.</p>
            </article>

            <article className="pet-detail-card">
              <span className="pet-detail-card-icon is-green"><i className="fas fa-heartbeat" /></span>
              <h2>Saúde e cuidados</h2>
              <ul className="pet-health-list">
                <li><i className="fas fa-check" /><span>Vacinado<strong>{booleanLabel(pet.vacinado)}</strong></span></li>
                <li><i className="fas fa-check" /><span>Castrado<strong>{booleanLabel(pet.castrado)}</strong></span></li>
                <li><i className="fas fa-check" /><span>Vermifugado<strong>{booleanLabel(pet.vermifugado)}</strong></span></li>
              </ul>
            </article>

          </section>
        </Container>
      </main>
      <Footer />
    </>
  );
};

export default PetDetails;
