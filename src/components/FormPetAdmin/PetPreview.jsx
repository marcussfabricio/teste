

const PetPreview = ({ data, onOpenPreviewModal }) => {
    return (
        <div className="text-center p-4 rounded-4 border-2" 
             style={{ 
                backgroundColor: '#FFFBEB', 
                border: '2px dashed var(--primary-color)', 
                maxWidth: '380px'
             }}>
            
            <h6 className="fw-bold mb-4 text-uppercase" 
                style={{ fontSize: '0.9rem', color: 'var(--primary-color)', letterSpacing: '1px' }}>
                Pré-visualização
            </h6>
            
            {/* O card simulando o site público */}
            <div className="card border-0 shadow-sm rounded-4 overflow-hidden mb-3 mx-auto" 
                 style={{ maxWidth: '300px' }}>
                
                <div style={{ height: '250px', background: '#f8f9fa' }} className="position-relative">
                    <div className="position-absolute p-3 end-0 top-0" style={{ zIndex: 5 }}>
                        <i className="far fa-heart bg-white p-2 rounded-circle shadow-sm text-muted"></i>
                    </div>
                    {data.foto ? (
                        <img src={data.foto} className="w-100 h-100 object-fit-cover" alt="Preview" />
                    ) : (
                        <div className="d-flex align-items-center justify-content-center h-100 text-muted">
                            <i className="fas fa-upload fa-3x opacity-25"></i>
                        </div>
                    )}
                </div>

                <div className="card-body text-start p-3">
                    <h5 className="fw-bold mb-1 text-dark">{data.nome || "Nome do cão"}</h5>
                    <p className="text-muted small mb-3">
                        {data.sexo || "Gênero"} • {data.idade || "Fase"} • Porte {data.porte || "Médio"}
                    </p>
                    
                    {/* Botão simulando o do site público */}
                    <button 
                        className="btn w-100 fw-bold text-white border-0 py-2 rounded shadow-sm"
                        style={{ backgroundColor: 'var(--primary-color)' }}
                        onClick={onOpenPreviewModal} // Dispara a abertura do modal
                    >
                        Conhecer
                    </button>
                </div>
            </div>
            
            <p className="text-muted small mt-3 mb-0" style={{ fontSize: '0.8rem' }}>
                Clique em "Conhecer" para testar a visualização completa.
            </p>
        </div>
    );
};

export default PetPreview;
