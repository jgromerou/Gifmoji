import Swal from "sweetalert2";

const Toast = Swal.mixin({
  toast: true,
  iconColor: "white",
  customClass: {
    popup: "colored-toast",
  },
  position: "bottom-end",
  showConfirmButton: false,
  timer: 1500,
  timerProgressBar: true,
  didOpen: (toast) => {
    toast.addEventListener("mouseenter", Swal.stopTimer);
    toast.addEventListener("mouseleave", Swal.resumeTimer);
  },
});

export default Toast;
