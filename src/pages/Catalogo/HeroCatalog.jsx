import bannerDogs from '../../assets/images/banner-caes.jpeg';
import './HeroCatalog.css';

function HeroCatalog () {
    return (
        <>
            <section className="py-2">
                <div className="container pt-4 pt-md-5">
                    <div className="row">
                        <div className="col-12 col-md-11 mx-auto">
                            <img
                                src={bannerDogs}
                                alt="Voluntários do abrigo reunidos com cães resgatados"
                                className="catalog-hero-image img-fluid rounded shadow-sm w-100"
                            />
                        </div>
                        <div className="col-12 text-center py-4 py-md-5">
                            <hr />
                            <h1 className="h2 fw-bold mt-3">Conheça nossos cães</h1>
                            <p className="text-muted mb-0">Encontre o companheiro ideal que está à espera de um lar.</p>
                        </div>
                    </div>
                </div>
                
            </section>
        </>
    );
}

export default HeroCatalog;
