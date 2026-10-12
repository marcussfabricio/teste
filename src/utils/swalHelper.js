import Swal from "sweetalert2";

// Paleta do Abrigo Animal Joinville
const COLORS = {
  primary: "#5f824f", // Verde — sucesso / confirmação positiva
  warning: "#f59a2e", // Laranja — avisos / ações destrutivas
  danger: "#dc3545",  // Vermelho — erros
  cancel: "#6c757d",
};

// Base reutilizada por todos os modais
const baseSwal = Swal.mixin({
  buttonsStyling: true,
  reverseButtons: true,
  customClass: {
    popup: "rounded-4",
    confirmButton: "fw-bold rounded px-5",
    cancelButton: "fw-bold rounded px-5",
  },
});

// Toast no canto — ideal para feedback rápido (sucesso de PUT/PATCH)
const toastSwal = Swal.mixin({
  toast: true,
  position: "top-end",
  showConfirmButton: false,
  timer: 2000,
  timerProgressBar: true,
  customClass: { popup: "rounded-4 shadow" },
});

export const showSuccess = (title, text) =>
  toastSwal.fire({ icon: "success", title, text, iconColor: COLORS.primary });

export const showError = (title, text) =>
  baseSwal.fire({
    icon: "error",
    title: title || "Algo deu errado",
    text: text || "Não foi possível concluir a ação. Tente novamente.",
    confirmButtonColor: COLORS.danger,
    confirmButtonText: "OK",
  });

export const showWarning = (title, text) =>
  baseSwal.fire({
    icon: "warning",
    title,
    text,
    confirmButtonColor: COLORS.warning,
    confirmButtonText: "OK",
  });

// Confirmação destrutiva (excluir, etc.) — botão laranja para reforçar atenção.
// Retorna boolean: true se o usuário confirmou.
export const confirmAction = async ({
  title = "Tem certeza?",
  text = "",
  confirmText = "Sim, confirmar",
  cancelText = "Cancelar",
  icon = "warning",
} = {}) => {
  const result = await baseSwal.fire({
    icon,
    title,
    text,
    showCancelButton: true,
    confirmButtonColor: COLORS.warning,
    cancelButtonColor: COLORS.cancel,
    confirmButtonText: confirmText,
    cancelButtonText: cancelText,
    focusCancel: true,
  });
  return result.isConfirmed;
};
