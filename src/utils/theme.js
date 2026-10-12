// Tema claro/escuro via atributo data-bs-theme (Bootstrap 5.3), persistido em localStorage.
const STORAGE_KEY = "patudos-theme";

export const getStoredTheme = () => {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved === "light" || saved === "dark") return saved;
    // Sem preferência salva: segue o sistema operacional.
    return window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
};

export const applyTheme = (theme) => {
    document.documentElement.setAttribute("data-bs-theme", theme);
};

export const setTheme = (theme) => {
    localStorage.setItem(STORAGE_KEY, theme);
    applyTheme(theme);
};

export const toggleTheme = () => {
    const current = document.documentElement.getAttribute("data-bs-theme") === "dark" ? "dark" : "light";
    const next = current === "dark" ? "light" : "dark";
    setTheme(next);
    return next;
};
