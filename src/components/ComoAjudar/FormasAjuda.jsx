
import { Link } from 'react-router-dom';

const formasAjuda = [
  {
    icon: "fa-heart",
    title: "Cuidado de Animais",
    desc: "Alimente, dê banho, brinque e ajude a socializar os animais acolhidos, proporcionando amor e cuidado.",
    color: "bg-danger-subtle text-danger",
  },
  {
    icon: "fa-hand-holding-heart",
    title: "Apadrinhe",
    desc: "Apadrinhe um cão e contribua com alimentação, saúde e cuidados enquanto ele espera por uma família.",
    color: "bg-info-subtle text-info",
    to: "/catalogo",
    action: "Conhecer cães disponíveis",
  },
  {
    icon: "fa-person-walking",
    title: "Rolê",
    desc: "Participe do Rolê dos Patudos todos os sábados. Não precisa agendar: é só ir até o abrigo e levar nossos cães para passear, socializar e receber carinho.",
    color: "bg-warning-subtle text-warning-emphasis",
    to: "/home#role-dos-patudos",
    action: "Ver informações do Rolê",
  },
  {
    icon: "fa-dog",
    title: "Adotar um idoso",
    desc: "Dê a um cão idoso a chance de viver seus próximos anos em um lar com conforto, companhia e muito amor.",
    color: "bg-success-subtle text-success",
    to: "/catalogo?idade=idoso",
    action: "Conhecer cães idosos",
  },
  {
    icon: "fa-bullhorn",
    title: "Divulgação e Redes",
    desc: "Ajude com fotografia, design gráfico, edição de vídeos ou publicações em redes sociais para ampliar nosso alcance.",
    color: "bg-primary-subtle text-primary",
    href: "https://www.instagram.com/abrigoanimaldejoinville/",
    action: "Acessar o Instagram",
  },
  {
    icon: "fa-box-open",
    title: "Doações de materiais e insumos",
    desc: "Doe ração, cobertores, toalhas, produtos de limpeza e outros itens que ajudam nos cuidados dos cães e na rotina do abrigo.",
    color: "bg-danger-subtle text-danger",
    to: "#doacoes",
    action: "Ver itens e endereço",
  },
];

const FormasAjuda = () => {
  return (
    <div className="mb-5">
      <h2 className="fw-bold text-center mb-4" style={{ fontFamily: "'Poppins', sans-serif" }}>
        Como você pode nos ajudar?
      </h2>
      <div className="row g-4">
        {formasAjuda.map((role, idx) => (
          <div key={idx} className="col-12 col-md-6 col-lg-4">
            <div className="card h-100 p-4 border shadow-sm rounded-4 flex-row gap-3">
              <div
                className={`rounded-3 d-flex align-items-center justify-content-center flex-shrink-0 ${role.color}`}
                style={{ width: "48px", height: "48px" }}
              >
                <i className={`fas ${role.icon} fs-5`}></i>
              </div>
              <div>
                <h3 className="fw-bold h5 text-dark mb-2" style={{ fontFamily: "'Poppins', sans-serif" }}>
                  {role.title}
                </h3>
                <p className="text-muted small mb-0" style={{ fontFamily: "'Inter', sans-serif", lineHeight: "1.5" }}>
                  {role.desc}
                </p>
                {role.to && (role.to.startsWith('#')
                  ? <a className="d-inline-flex align-items-center gap-2 mt-3 fw-semibold text-decoration-none" href={role.to}>{role.action} <i className="fas fa-arrow-right" aria-hidden="true" /></a>
                  : <Link className="d-inline-flex align-items-center gap-2 mt-3 fw-semibold text-decoration-none" to={role.to}>{role.action} <i className="fas fa-arrow-right" aria-hidden="true" /></Link>)}
                {role.href && <a className="d-inline-flex align-items-center gap-2 mt-3 fw-semibold text-decoration-none" href={role.href} target="_blank" rel="noopener noreferrer">{role.action} <i className="fas fa-arrow-right" aria-hidden="true" /></a>}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FormasAjuda;
