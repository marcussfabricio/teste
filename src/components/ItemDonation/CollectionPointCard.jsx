import { useState } from "react";

const CollectionPointCard = ({ name, address }) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(address);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="col-12 col-lg-8">
      <div className="card h-100 p-4 border shadow-sm rounded-4 bg-white position-relative">
        <h3 className="fw-bold h6 text-dark mb-3 d-flex align-items-center gap-2" style={{ fontFamily: "'Poppins', sans-serif" }}>
          <i className="fas fa-location-dot text-primary flex-shrink-0"></i>
          {name}
        </h3>
        <div className="mb-4 text-secondary small d-flex flex-column gap-2" style={{ fontFamily: "'Inter', sans-serif" }}>
          <p className="mb-0">
            <span className="fw-bold text-dark">Endereço:</span> {address}
          </p>
        </div>

        <button
          onClick={handleCopy}
          className={`btn w-100 py-2 fw-semibold mt-auto d-flex align-items-center justify-content-center gap-2 small ${copied ? "btn-success" : "btn-outline-secondary"}`}
          style={{ fontFamily: "'Inter', sans-serif" }}
        >
          {copied ? (
            <>
              <i className="fas fa-check"></i>
              Endereço Copiado!
            </>
          ) : (
            <>
              <i className="fas fa-copy"></i>
              Copiar Endereço
            </>
          )}
        </button>
      </div>
    </div>
  );
};

export default CollectionPointCard;
