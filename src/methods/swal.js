import Swal from 'sweetalert2';
// warning, error, success, info, and, question

export default function swalert(icon, title, posi = 'center') {
  Swal.fire({
    position: posi,
    toast: true,
    icon,
    title,
    showConfirmButton: false,
    timer: 1500,
    timerProgressBar: true,
    width: '16rem',
  });
}
