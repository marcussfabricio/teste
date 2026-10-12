import { useState } from "react";
import { toggleTheme } from "../../utils/theme";

// Botão de alternância claro/escuro. Lê o estado inicial do atributo já aplicado
// em main.jsx, então não há "flash".
const ThemeToggle = ({ className = "" }) => {
    const [dark, setDark] = useState(
        () => document.documentElement.getAttribute("data-bs-theme") === "dark"
    );

    const handleToggle = () => {
        const next = toggleTheme();
        setDark(next === "dark");
    };

    return (
        <button
            type="button"
            className={`btn btn-link nav-link px-3 ${className}`}
            onClick={handleToggle}
            aria-label={dark ? "Ativar modo claro" : "Ativar modo escuro"}
            title={dark ? "Modo claro" : "Modo escuro"}
        >
            <i className={`bi ${dark ? "bi-sun-fill" : "bi-moon-stars-fill"}`} style={{ fontSize: "1.1rem" }}></i>
        </button>
    );
};

export default ThemeToggle;
