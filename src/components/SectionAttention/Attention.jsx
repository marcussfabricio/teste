import { Link } from 'react-router-dom';

const Attention = () => {

    return (
        <section
            className="alert alert-warning py-4 my-4 rounded-4 shadow-sm border-0 border-start"
            style={{ borderLeft: '6px solid #dc3545' }}
        >
            <div className="container">
                <div className="row align-items-center g-3">

                    {/* Ícone */}
                    <div className="col-auto d-none d-md-block">
                        <i
                            className="bi bi-exclamation-triangle-fill"
                            style={{ fontSize: '3rem', color: '#dc3545' }}
                        ></i>
                    </div>

                    {/* Conteúdo */}
                    <div className="col">
                        <h2 className="h5 fw-bold mb-1" style={{ color: '#dc3545' }}>
                            <i className="bi bi-exclamation-triangle-fill me-2 d-md-none"></i>
                            Maus-tratos animais é crime!
                        </h2>
                        <p className="mb-0 text-body-emphasis d-none d-md-block" style={{ fontSize: '0.92rem' }}>
                            A <strong>Lei 9.605/98</strong> e a <strong>Lei 14.064/2020</strong> tipificam o abuso e os
                            maus-tratos a animais domésticos como crime, com pena de até{' '}
                            <strong>5 anos de reclusão</strong>, multa e proibição de guarda de animais.
                            Se você presenciar ou suspeitar de uma situação de abuso,{' '}
                            <strong>denuncie</strong>.
                        </p>
                        <p className="mb-0 text-body-emphasis d-md-none" style={{ fontSize: '0.92rem' }}>
                            Se presenciar ou suspeitar de maus-tratos, consulte as orientações e denuncie.
                        </p>
                    </div>

                    {/* Botão */}
                    <div className="col-12 col-md-auto">
                        <Link
                            to="/denuncia"
                            className="btn btn-danger fw-bold w-100 rounded-pill" 
                            style={{ whiteSpace: 'nowrap' }}
                        >
                            <i className="bi bi-megaphone-fill me-2"></i>
                            Fazer Denúncia
                        </Link>
                    </div>

                </div>
            </div>
        </section>
    );
};

export default Attention;
