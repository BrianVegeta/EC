/* eslint-disable import/prefer-default-export */
import swal from 'sweetalert2';
import 'sweetalert2/dist/sweetalert2.min.css';

export const confirmConfig = ({ title, text, confirmButtonText }) => ({
  title,
  text,
  type: 'warning',
  showCancelButton: true,
  confirmButtonColor: '#3085d6',
  cancelButtonColor: '#d33',
  confirmButtonText,
  cancelButtonText: '取消',
});

export const warningConfig = ({ title, text }) => ({
  title,
  text,
  type: 'warning',
});

export const successConfig = ({ title, text }) => ({
  title,
  text,
  type: 'success',
});

export const errorConfig = ({ title, text }) => ({
  title,
  text,
  type: 'error',
});

export default swal;
