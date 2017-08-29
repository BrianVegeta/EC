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

export default swal;
