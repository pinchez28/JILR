import Swal from 'sweetalert2';

// success
export const showSuccess = (title, text) => {
  Swal.fire({
    icon: 'success',
    title,
    text,
    timer: 2000,
    showConfirmButton: false,
  });
};

// error
export const showError = (text) => {
  Swal.fire({
    icon: 'error',
    title: 'Error',
    text,
  });
};

// info
export const showInfo = (title, text) => {
  Swal.fire({
    icon: 'info',
    title,
    text,
  });
};

// loading
export const showLoading = (text = 'Processing...') => {
  Swal.fire({
    title: text,
    allowOutsideClick: false,
    didOpen: () => {
      Swal.showLoading();
    },
  });
};

// close loading
export const closeAlert = () => {
  Swal.close();
};
