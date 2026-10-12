
const HistorySection = ({ ano, titulo, children, imagem, legenda, reverse }) => {
  return (
    <section className="py-5 container">
      <div className={`row align-items-center ${reverse ? 'flex-row-reverse' : ''}`}>
        <div className="col-lg-6 px-4">
          {ano && <span className="text-primary fw-bold text-uppercase d-block mb-2">{ano}</span>}
          <h2 className="fw-bold mb-4">{titulo}</h2>
          <div className="text-muted lh-lg">
            {children}
          </div>
        </div>
        <div className="col-lg-6 text-center mt-5 mt-lg-0">
          <div className={`polaroid-wrapper ${reverse ? 'rotate-right' : 'rotate-left'}`}>
             {/* Aqui você pode manter sua classe .polaroid do CSS antigo para o efeito de foto */}
            <div className="polaroid shadow-lg p-3 bg-white">
              <img src={imagem} alt={titulo} className="img-fluid rounded" />
              <p className="mt-3 mb-0 font-monospace text-muted">{legenda}</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HistorySection;