import { useState } from "react";
import { Offcanvas, Button } from "react-bootstrap";
import AdminSidebar from "./AdminSidebar";
import AdminFooter from "./AdminFooter";
import logo from "../../assets/images/logo.png";
import "../../styles/admin.css";

const AdminLayout = ({ active, onSelect, children }) => {
    const [show, setShow] = useState(false);

    // No mobile, escolher um item fecha o drawer.
    const handleMobileSelect = (key) => {
        onSelect(key);
        setShow(false);
    };

    return (
        <div className="admin-shell d-flex min-vh-100" data-bs-theme="light" style={{ background: "var(--background-color)" }}>
            <aside className="admin-sidebar-col d-none d-lg-block">
                <AdminSidebar active={active} onSelect={onSelect} />
            </aside>

            <Offcanvas show={show} onHide={() => setShow(false)} style={{ width: 240 }} aria-label="Menu administrativo">
                <Offcanvas.Body className="p-0">
                    <AdminSidebar active={active} onSelect={handleMobileSelect} />
                </Offcanvas.Body>
            </Offcanvas>

            <div className="flex-grow-1 d-flex flex-column" style={{ minWidth: 0 }}>
                <div className="d-flex d-lg-none align-items-center gap-3 px-3 py-2 bg-white border-bottom sticky-top">
                    <Button variant="link" className="admin-menu-toggle p-0 text-dark fs-4 lh-1" onClick={() => setShow(true)} aria-label="Abrir menu">
                        <i className="fas fa-bars" aria-hidden="true"></i>
                    </Button>
                    <div className="d-flex align-items-center gap-2">
                        <img src={logo} alt="Abrigo Animal Joinville" width="38" height="38" className="rounded-circle object-fit-contain" />
                        <span className="lh-1 fw-bold">
                            <span style={{ color: "var(--primary-color)", fontSize: "0.82rem" }}>ABRIGO ANIMAL</span><br />
                            <span style={{ color: "var(--secondary-color)", fontSize: "0.62rem", letterSpacing: "1.6px" }}>JOINVILLE</span>
                        </span>
                    </div>
                </div>

                <div className="p-3 p-md-4 flex-grow-1">{children}</div>

                <AdminFooter />
            </div>
        </div>
    );
};

export default AdminLayout;
