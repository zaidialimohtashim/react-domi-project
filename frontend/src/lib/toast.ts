import Swl, { SweetAlertIcon } from "sweetalert2";

export const toast = (iconName: SweetAlertIcon, text: string) => {
  const Toast = Swl.mixin({
    toast: true,
    position: "top-end",
    showConfirmButton: false,
    timer: 3000,
    timerProgressBar: true,
    didOpen: (toast) => {
      toast.addEventListener("mouseenter", Swl.stopTimer);
      toast.addEventListener("mouseleave", Swl.resumeTimer);
    },
  });

  Toast.fire({
    icon: iconName,
    title: text,
  });
};
