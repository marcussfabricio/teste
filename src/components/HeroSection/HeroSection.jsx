import { Link } from "react-router-dom";
import heroDog from "../../assets/images/cao-gravata.jpg";

const HeroSection = () => {

    return (
        <section className="py-2" style={{ backgroundColor: 'var(--background-color)' }}>
            <div className="container py-4 py-md-5">
                <div className="row align-items-center">

                    {/* Lado Esquerdo: Conteúdo */}
                    <div className="col-lg-6 text-center text-lg-start">
                        <h1 className="hero-heading fw-bold mb-4" style={{ color: 'var(--text-color)' }}>
                            Transforme uma vida, <br />
                            <span style={{ color: 'var(--primary-color)' }}>adote um amigo.</span>
                        </h1>

                        <div className="border-start border-4 border-warning ps-4 mb-4 text-start">
                            <p className="text-muted fs-6 fs-lg-5 mb-0">
                                Desde 2001, o Abrigo Animal Joinville atua protegendo e
                                reabilitando animais para que encontrem o lar que sempre mereceram.
                            </p>
                        </div>

                        <Link
                            className="hero-cta btn btn-lg px-5 py-3 fw-bold text-white shadow"
                            to="/catalogo"
                            style={{ backgroundColor: 'var(--primary-color)', border: 'none', borderRadius: '12px' }}
                        >
                            ADOTAR
                        </Link>
                    </div>

                    {/* Lado Direito: Imagem Circular */}
                    <div className="col-lg-6 text-center mt-4 mt-lg-0">
                        <div className="position-relative d-inline-block">
                            <div
                                className="rounded-circle shadow-lg overflow-hidden border border-5 border-white"
                                style={{ width: 'min(72vw, 420px)', height: 'min(72vw, 420px)' }}
                            >
                                <img
                                    src={heroDog}
                                    alt="Cão de gravata do Abrigo Animal Joinville"
                                    className="w-100 h-100"
                                    style={{ objectFit: 'cover' }}
                                />
                            </div>
                        </div>
                    </div>

                </div>
            </div>
        </section>
    );
};

export default HeroSection;
