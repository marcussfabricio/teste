import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";

import AdminLayout from "../../components/Layout/AdminLayout";
import DashboardHeader from "../../components/Admin/DashboardHeader";
import FeaturedPet from "../../components/Admin/FeaturedPet";
import KpiCards from "../../components/Admin/KpiCards";
import ManagementTable from "../../components/Admin/ManagementTable";
import PetModal from "../../components/Pets/PetModal";

import { getPets, adotarPet, deletePet } from "../../services/petService";
import { confirmAction, showSuccess, showError } from "../../utils/swalHelper";

const AdminHome = () => {
    const navigate = useNavigate();
    const [pets, setPets] = useState([]);
    const [activeNav, setActiveNav] = useState("overview");
    const [manageTab, setManageTab] = useState("pets");
    const [selectedPet, setSelectedPet] = useState(null);
    const manageRef = useRef(null);

    useEffect(() => {
        const loadData = async () => {
            try {
                const petsResponse = await getPets({ status: "disponivel", paginado: false });
                setPets(petsResponse.content || petsResponse);
            } catch (error) {
                console.error("Erro ao carregar dados do admin:", error);
            }
        };
        loadData();
    }, []);

    // Navegação da sidebar troca a visão da gestão e rola até a tabela.
    const handleNav = (key) => {
        setActiveNav(key);
        if (key === "overview") {
            window.scrollTo({ top: 0, behavior: "smooth" });
        } else if (key === "pets") {
            setManageTab("pets");
            manageRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
        }
    };

    const handleTabChange = (key) => {
        setManageTab(key);
        setActiveNav(key);
    };

    const handleEditPet = (pet) => navigate(`/admin/edit-pet/${pet.id}`, { state: { pet } });

    const handleDeletePet = async (id) => {
        const confirmed = await confirmAction({
            title: "Excluir cão?",
            text: "Esta ação removerá o cão do catálogo deste navegador.",
            confirmText: "Sim, excluir",
            icon: "warning",
        });
        if (!confirmed) return;
        try {
            await deletePet(id);
            setPets((prev) => prev.filter((p) => p.id !== id));
            showSuccess("Cão removido");
        } catch (error) {
            console.error("Erro ao excluir pet:", error);
            showError("Não foi possível excluir o cão", error.message);
        }
    };

    const handleAdoptPet = async (pet) => {
        const confirmed = await confirmAction({
            title: `Marcar ${pet.nome} como adotado?`,
            text: "O cão sairá da lista de disponíveis.",
            confirmText: "Confirmar adoção",
            icon: "question",
        });
        if (!confirmed) return;
        try {
            await adotarPet(pet.id);
            setPets((prev) => prev.filter((p) => p.id !== pet.id));
            showSuccess(`${pet.nome} foi para um novo lar!`);
        } catch (error) {
            console.error("Erro ao adotar pet:", error);
            showError("Não foi possível atualizar o status do pet", error.message);
        }
    };

    // Dados derivados
    const petMaisAntigo = pets.length
        ? pets.reduce((a, b) => (new Date(a.criadoEm) <= new Date(b.criadoEm) ? a : b))
        : null;

    return (
        <AdminLayout active={activeNav} onSelect={handleNav}>
            <DashboardHeader />

            <FeaturedPet pet={petMaisAntigo} onView={setSelectedPet} />

            <KpiCards />

            <div ref={manageRef}>
                <ManagementTable
                    activeTab={manageTab}
                    onTabChange={handleTabChange}
                    pets={pets}
                    showTabs={false}
                    onViewPet={setSelectedPet}
                    onAddPet={() => navigate("/admin/post-pet")}
                    onEditPet={handleEditPet}
                    onDeletePet={handleDeletePet}
                    onAdoptPet={handleAdoptPet}
                />
            </div>

            <PetModal pet={selectedPet} onClose={() => setSelectedPet(null)} />
        </AdminLayout>
    );
};

export default AdminHome;
