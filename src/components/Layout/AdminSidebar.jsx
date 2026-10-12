import { useNavigate } from "react-router-dom";
import { Nav } from "react-bootstrap";
import logo from "../../assets/images/logo.png";
import { useAuth } from "../../context/AuthContext";

const NAV_ITEMS = [
    { key: "overview", label: "Visão geral", icon: "fa-gauge-high" },
    { key: "pets", label: "Cães", icon: "fa-paw" },
    { key: "apadrinhamentos", label: "Apadrinhamentos", icon: "fa-hand-holding-heart" },
    { key: "midias", label: "Mídias da página inicial", icon: "fa-photo-film" },
];

const itemClass = (active) =>
    `admin-nav text-start d-flex align-items-center gap-2 w-100 rounded-3 px-3 py-2 mb-1 ${active ? "active" : ""}`;

const AdminSidebar = ({ active, onSelect }) => {
    const navigate = useNavigate();
    const { logout } = useAuth();
    const selectItem = (key) => {
        if (key === "apadrinhamentos" || key === "midias") return navigate(`/admin/${key}`);
        onSelect(key);
    };

    return (
        <div className="admin-sidebar bg-white border-end p-3 d-flex flex-column">
            <div className="d-flex align-items-center gap-2 px-1 pb-3">
                <img src={logo} alt="Abrigo Animal Joinville" width="42" height="42" className="rounded-circle object-fit-contain" />
                <span className="lh-1 fw-bold">
                    <span style={{ color: "var(--primary-color)", fontSize: "0.78rem" }}>ABRIGO ANIMAL</span><br />
                    <span style={{ color: "var(--secondary-color)", fontSize: "0.62rem", letterSpacing: "1.5px" }}>JOINVILLE</span>
                </span>
            </div>

            <div className="text-muted px-2 pb-1" style={{ fontSize: "0.66rem", letterSpacing: "0.6px" }}>PAINEL</div>
            <Nav className="flex-column">
                {NAV_ITEMS.map((item) => (
                    <button key={item.key} type="button" className={itemClass(active === item.key)} onClick={() => selectItem(item.key)}>
                        <i className={`fas ${item.icon}`} style={{ width: 18 }} aria-hidden="true"></i> {item.label}
                    </button>
                ))}

            </Nav>

            <div className="mt-auto border-top pt-2">
                <button type="button" className={itemClass(false)} onClick={() => { logout(); navigate("/home"); }}>
                    <i className="fas fa-globe" style={{ width: 18 }} aria-hidden="true"></i> Ver site
                </button>
                <button type="button" className={itemClass(false)} onClick={() => navigate("/home")}>
                    <i className="fas fa-right-from-bracket" style={{ width: 18 }} aria-hidden="true"></i> Sair
                </button>
            </div>
        </div>
    );
};

export default AdminSidebar;
