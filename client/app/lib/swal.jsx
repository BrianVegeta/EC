/* eslint-disable import/prefer-default-export */
import swal from 'sweetalert2';
import 'sweetalert2/dist/sweetalert2.min.css';
import './swal-override.scss';

const commonConfig = {
  reverseButtons: true,
  cancelButtonText: '取消',
  confirmButtonText: '確定',
};

const dropConfig = {
  title: '確定下架此商品？',
  text: '下架之後即無法還原',
  showCancelButton: true,
  confirmButtonText: '下架',
};

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
  confirmButtonText: '確定',
});

export const successConfig = ({ title, text }) => ({
  title,
  text,
  type: 'success',
  confirmButtonText: '確定',
});

export const errorConfig = ({ title, text }) => ({
  title,
  text,
  type: 'error',
  confirmButtonText: '確定',
});

export const swalDropItem = () =>
  swal(Object.assign({}, commonConfig, dropConfig));

export const swalNormal = ({ title, text }) =>
  swal(Object.assign({}, commonConfig, { title, text }));

export default swal;
