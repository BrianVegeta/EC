/* eslint-disable import/prefer-default-export */
import swal from 'sweetalert2';
import 'sweetalert2/dist/sweetalert2.min.css';
import './swal-override.scss';


const commonConfig = {
  reverseButtons: true,
  cancelButtonText: '取消',
  confirmButtonText: '確定',
};

export const orderConfig = text =>
  Object.assign({}, commonConfig, {
    title: '提示',
    text,
    type: 'warning',
    showCancelButton: true,
    cancelButtonText: '否',
    confirmButtonText: '是',
  });

export const warningConfig = ({ title, text }) =>
  Object.assign({}, commonConfig, {
    title,
    text,
    type: 'warning',
  });

export const successConfig = ({ title, text }) =>
  Object.assign({}, commonConfig, {
    title,
    text,
    type: 'success',
  });

export const errorConfig = ({ title, text }) =>
  Object.assign({}, commonConfig, {
    title,
    text,
    type: 'error',
  });

export const swalDropItem = () =>
  swal(Object.assign({}, commonConfig, {
    title: '確定下架此商品？',
    text: '下架之後即無法還原',
    showCancelButton: true,
    confirmButtonText: '下架',
  }));

export const swalDropWish = () =>
  swal(Object.assign({}, commonConfig, {
    title: '確定刪除此許願紙條？',
    text: '刪除之後即無法還原',
    showCancelButton: true,
    confirmButtonText: '刪除',
  }));

export const swalAsk = ({ title, text }) =>
  swal(Object.assign({}, commonConfig, {
    title,
    text,
    showCancelButton: true,
    confirmButtonText: '確認',
  }));

export const swalNormal = ({ title, text }) =>
  swal(Object.assign({}, commonConfig, { title, text }));

export default swal;
