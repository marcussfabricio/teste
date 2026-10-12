import './Pilar.css';

const PilarCard = ({ icon, title, text }) => (
  <div className="col-md-4 mb-4">
    <div className="card h-100 border-0 shadow-sm text-center p-4 py-5">
      <div className="mb-3" style={{ color: 'var(--primary-color)' }}>
        <i className={`fas ${icon} fa-3x`}></i>
      </div>
      <h3 className="h5 fw-bold">{title}</h3>
      <p className="text-muted mb-0">{text}</p>
    </div>
  </div>
);

const Pilares = () => {
  return (
    <section className="bg-light py-5">
      <div className="container">
        <div className="row">
          <PilarCard 
            icon="fa-heart" 
            title="Proteção" 
            text="Acolhimento e cuidado para animais abandonados ou vítimas de maus-tratos." 
          />
          <PilarCard 
            icon="fa-eye" 
            title="Responsabilidade" 
            text="Vacinação, castração e acompanhamento veterinário dentro das possibilidades do abrigo." 
          />
          <PilarCard 
            icon="fa-users" 
            title="Comunidade" 
            text="Voluntários, equipe e doadores unidos para manter o trabalho desde 2001." 
          />
        </div>
      </div>
    </section>
  );
};

export default Pilares;
