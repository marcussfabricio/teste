import { Container } from 'react-bootstrap';

import Navbar from "../../components/Layout/Navbar";
import Footer from "../../components/Layout/Footer";

import FormasAjuda from "../../components/ComoAjudar/FormasAjuda";
import DonationSection from "../../components/ItemDonation/DonationSection";

const ComoAjudar = () => {
    return (
        <>
            <Navbar />
            <div className="min-vh-100 bg-light">

                {/* Header Minimalista */}
                <header className="py-5 bg-light border-bottom">
                    <Container className="text-center py-2 py-md-4">
                        <span className="text-primary fw-bold text-uppercase small">Institucional</span>
                        <h1 className="display-5 fw-bold mt-2">Como Ajudar</h1>
                        <p className="text-muted mx-auto mb-0" style={{ maxWidth: '600px' }}>
                            O abrigo é mantido por doações e pelo trabalho voluntário. Escolha como fazer parte.
                        </p>
                    </Container>
                </header>

                {/* Grid Principal do Conteúdo */}
                <div className="container py-5">

                    <FormasAjuda />
                    <DonationSection />

                </div>
            </div>
            <Footer />
        </>
    );
};

export default ComoAjudar;
