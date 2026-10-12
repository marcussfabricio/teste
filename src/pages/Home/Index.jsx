import { useEffect, useState } from 'react';
import { Container } from 'react-bootstrap';
import { getPets } from '../../services/petService';
import Navbar from '../../components/Layout/Navbar';
import Footer from '../../components/Layout/Footer';
import HeroSection from '../../components/HeroSection/HeroSection';
import DogSection from '../../components/Pets/DogSection';
import Attention from '../../components/SectionAttention/Attention';
import HomeExperience from '../../components/Home/HomeExperience';
import '../../styles/global.css';

const Home = () => {
  const [pets, setPets] = useState([]);
  useEffect(() => {
    const refresh = () => { getPets({ size: 8 }).then((result) => setPets(result.content || [])); };
    refresh();
    window.addEventListener('abrigo:pets-updated', refresh);
    return () => window.removeEventListener('abrigo:pets-updated', refresh);
  }, []);
  return <><Navbar /><HeroSection /><Container className="py-4"><Attention /><DogSection pets={pets.slice(0, 4)} /><HomeExperience /></Container><Footer /></>;
};
export default Home;
