import { useState } from "react";
import { Container, Row, Col } from "react-bootstrap";
import { Link, useNavigate, useParams, useLocation } from "react-router-dom";
import PetForm from "../../components/FormPetAdmin/PetForm";
import PetPreview from "../../components/FormPetAdmin/PetPreview";
import NavBarAdmin from "../../components/Layout/NavBarAdmin";
import AdminFooter from "../../components/Layout/AdminFooter";
import PetModal from "../../components/Pets/PetModal";
import { showWarning } from "../../utils/swalHelper";
import { getAllPets } from "../../services/petService";

const PostPet = () => {
    const navigate = useNavigate();
    const { id } = useParams();
    const location = useLocation();

    // Normaliza os dados locais para casar com as opções dos selects.
    const capitalize = (s) => (s ? s.charAt(0).toUpperCase() + s.slice(1) : s);

    const [petData, setPetData] = useState(() => {
      const pet = location.state?.pet || getAllPets().find((item) => String(item.id) === String(id));
      return pet ? {
        id: pet.id,
        nome: pet.nome ?? "",
        especie: capitalize(pet.especie) || "Cachorro",
        idade: capitalize(pet.idade) || "Adulto",
        porte: capitalize(pet.porte) || "Médio",
        sexo: capitalize(pet.genero) || "Macho",
        descricao: pet.descricao ?? "",
        foto: pet.urlFoto ?? null,
        vacinado: pet.vacinado ?? false,
        castrado: pet.castrado ?? false,
        vermifugado: pet.vermifugado ?? false,
      } : {
        nome: "",
        especie: "Cachorro",
        idade: "Adulto",
        porte: "Médio",
        sexo: "Macho",
        descricao: "",
        foto: null,
        vacinado: false,
        castrado: false,
        vermifugado: false,
      };
    });

    const handleDataChange = (newData) => {
        setPetData(prev => typeof newData === 'function' ? newData(prev) : newData);
    };

    const handleSaveSuccess = () => {
        navigate("/admin");
    };

    const [showModal, setShowModal] = useState(false);

    const handleOpenModal = () => {
        const isFilled = petData.nome &&
            petData.especie !== "Espécie" &&
            petData.idade !== "Idade" &&
            petData.sexo !== "Gênero" &&
            petData.descricao &&
            petData.foto;

        if (isFilled) {
            setShowModal(true);
        } else {
            showWarning(
                "Pré-visualização indisponível",
                "Preencha todos os campos e confirme a foto para visualizar."
            );
        }
    };
    const handleCloseModal = () => setShowModal(false);

    return (
        <div className="bg-light min-vh-100 d-flex flex-column" data-bs-theme="light">
            <NavBarAdmin />
            <Container className="py-4 flex-grow-1">
                <div className="mb-4">
                    <Link to="/admin" className="text-decoration-none text-dark fw-bold">
                        <i className="fas fa-arrow-left me-2"></i> Voltar ao Painel
                    </Link>
                </div>

                <Row className="g-4">
                    {/* Lado Esquerdo: Formulário */}
                    <Col lg={7}>
                        <PetForm data={petData} onDataChange={handleDataChange} onSuccess={handleSaveSuccess} />
                    </Col>

                    {/* Lado Direito: Preview (Fica fixo no scroll) */}
                    <Col lg={5}>
                        <div className="sticky-top" style={{ top: "100px" }}>
                            <PetPreview data={petData} onOpenPreviewModal={handleOpenModal} />
                        </div>
                    </Col>
                </Row>
            </Container>
            <AdminFooter />
            <PetModal
                show={showModal}
                onClose={handleCloseModal}
                pet={petData}
            />
        </div>
    );
};

export default PostPet;
