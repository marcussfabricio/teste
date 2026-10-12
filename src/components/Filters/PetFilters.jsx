import { Offcanvas, Button } from 'react-bootstrap';
import { useState } from 'react';
import './PetFilters.css';

const FilterGroup = ({ title, options, current, onChange }) => (
  <div className="filter-section mb-3 mb-lg-0 me-lg-4">
    <h6 className="fw-bold small text-uppercase mb-2 text-dark">{title}</h6>
    <div className="d-flex gap-2 flex-wrap">
      {options.map(opt => {
        const isActive = current === opt.value;
        return (
          <button
            key={opt.value}
            type="button"
            className={`btn btn-sm rounded fw-semibold ${
              isActive ? 'btn-filter-active' : 'btn-filter-outline'
            }`}
            onClick={() => onChange(opt.value)}
          >
            {opt.label}
          </button>
        );
      })}
    </div>
  </div>
);

const PetFilters = ({ filters, setFilters, onApply, onClear, showClear }) => {
  const [showMobile, setShowMobile] = useState(false);

  const filterContent = (
    <>
      <FilterGroup 
        title="Gênero" 
        options={[{label: 'Todos', value: 'todos'}, {label: 'Macho', value: 'Macho'}, {label: 'Fêmea', value: 'Fêmea'}]}
        current={filters.genero}
        onChange={(v) => setFilters({...filters, genero: v})}
      />
      <FilterGroup 
        title="Idade" 
        options={[{label: 'Todos', value: 'todos'}, {label: 'Filhote', value: 'Filhote'}, {label: 'Adulto', value: 'Adulto'}, {label: 'Idoso', value: 'Idoso'}]}
        current={filters.idade}
        onChange={(v) => setFilters({...filters, idade: v})}
      />
      <button type="button" className="btn btn-primary d-none d-lg-block align-self-end" onClick={onApply}>
        <i className="fas fa-sliders-h me-2"></i>Filtrar
      </button>
      {showClear && (
        <button type="button" className="btn btn-link d-none d-lg-block align-self-end text-decoration-none fw-semibold" onClick={onClear}>
          Limpar filtros
        </button>
      )}
    </>
  );

  return (
    <div className="bg-light p-3 rounded shadow-sm mb-4">
      {/* Mobile Toggle */}
      <div className="d-lg-none">
        <Button variant="primary" className="w-100" onClick={() => setShowMobile(true)}>
          <i className="fas fa-filter me-2"></i>Filtrar cães
        </Button>
      </div>

      {/* Desktop Horizontal Bar */}
      <div className="d-none d-lg-flex align-items-center justify-content-center">
        {filterContent}
      </div>

      {/* Mobile Sidebar (Offcanvas) */}
      <Offcanvas show={showMobile} onHide={() => setShowMobile(false)} placement="start" style={{ width: '300px' }}>
        <Offcanvas.Header closeButton>
          <Offcanvas.Title className="fw-bold"> <i className="fas fa-filter me-2"></i> Filtros</Offcanvas.Title>
        </Offcanvas.Header>
        <Offcanvas.Body>
          <div className="d-flex flex-column gap-4">
            {filterContent}
            <Button variant="primary" className="w-100 mt-3" onClick={() => { onApply(); setShowMobile(false); }}>
              Aplicar Filtros
            </Button>
            {showClear && (
              <Button variant="link" className="w-100 text-decoration-none fw-semibold" onClick={() => { onClear(); setShowMobile(false); }}>
                Limpar filtros
              </Button>
            )}
          </div>
        </Offcanvas.Body>
      </Offcanvas>
    </div>
  );
};

export default PetFilters;
