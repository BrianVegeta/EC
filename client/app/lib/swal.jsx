/* eslint-disable import/prefer-default-export */
import swal from 'sweetalert2';
import 'sweetalert2/dist/sweetalert2.min.css';

export const dropConfig = ({ title, text, confirmText }) => ({
  title,
  text,
  showCancelButton: true,
  cancelButtonColor: '#31ABBA',
  cancelButtonText: confirmText,
  confirmButtonColor: '#AAA',
  confirmButtonText: '取消',
});
export const orderConfig = text => ({
  title: '提示',
  text,
  type: 'warning',
  showCancelButton: true,
  cancelButtonColor: '#31ABBA',
  cancelButtonText: '是',
  confirmButtonColor: '#AAA',
  confirmButtonText: '否',
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
