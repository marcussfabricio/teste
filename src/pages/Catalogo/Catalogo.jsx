import Navbar from '../../components/Layout/Navbar';
import HeroCatalog from './HeroCatalog.jsx';
import Footer from '../../components/Layout/Footer.jsx';
import PetCatalog from './PetCatalog.jsx';

const Catalogo = () => {
    return (
    <>
        <Navbar />

        <HeroCatalog />

        <PetCatalog />
        
        <Footer />
    </>
    );
}

export default Catalogo;