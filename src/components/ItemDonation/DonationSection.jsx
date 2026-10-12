import CollectionPointCard from "./CollectionPointCard";
import "./DonationSection.css";

const donationItems = [
    { label: "Ração", icon: "fa-bone" },
    { label: "Medicamentos", icon: "fa-capsules" },
    { label: "Produtos de higiene", icon: "fa-pump-soap" },
    { label: "Cobertores e toalhas", icon: "fa-bed" },
    { label: "Outros itens para os cães", icon: "fa-box-open" },
];

const DonationSection = () => {
    return (
        <section id="doacoes" aria-labelledby="donation-title" style={{ scrollMarginTop: '110px' }}>
                <header className="border-top pt-5 mb-4">
                    <div className="text-center py-2 py-md-4">
                        <span className="text-primary fw-bold text-uppercase small">Envolva-se</span>
                        <h2 id="donation-title" className="display-6 fw-bold mt-2">Doação de materiais e insumos</h2>
                        <p className="text-muted mx-auto mb-0" style={{ maxWidth: '600px' }}>
                            Cada doação ajuda a manter a alimentação, a saúde, a higiene e o conforto dos cães acolhidos.
                        </p>
                    </div>
                </header>

                {/* Main Container Layout */}
                <div>
                    <div className="donation-items-highlight mx-auto mb-5" aria-labelledby="donation-items-title">
                        <div className="donation-items-heading">
                            <span className="donation-items-icon" aria-hidden="true"><i className="fas fa-box"></i></span>
                            <div>
                                <span className="donation-items-kicker">Itens que fazem diferença</span>
                                <h3 id="donation-items-title">O que você pode doar</h3>
                            </div>
                        </div>
                        <div className="donation-items-grid">
                            {donationItems.map((item) => (
                                <div className="donation-item" key={item.label}>
                                    <span aria-hidden="true"><i className={`fas ${item.icon}`}></i></span>
                                    <strong>{item.label}</strong>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Bloco dos Postos de Coleta */}
                    <div className="mb-5">
                        <h2 className="fw-bold h3 text-dark text-center mb-1" style={{ fontFamily: "'Poppins', sans-serif" }}>
                            Onde entregar suas doações?
                        </h2>
                        <p className="text-muted small text-center mb-4 mx-auto" style={{ fontFamily: "'Inter', sans-serif", maxWidth: "450px" }}>
                            Entregue suas doações diretamente no Abrigo Animal Joinville.
                        </p>

                        <div className="row g-4 justify-content-center">
                            <CollectionPointCard
                                name="Abrigo Animal Joinville"
                                address="Estrada Blumenau, s/n — Vila Nova, Joinville — SC"
                            />
                        </div>
                    </div>

                </div>
        </section>
    );
};

export default DonationSection;
