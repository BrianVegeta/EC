import validate from 'validate.js';
import { formatCurrency } from 'lib/currency';
import {
  parseInt,
} from 'lodash';

export const PRICE_MIN = 100;
export const PRICE_MAX = 99999;
// export const AMOUNT_MAX = 99;
// export const AMOUNT_MIN = 1;
export const SERVICE_UNIT_MIN = 1;
export const SERVICE_RESERVATION_DAYS_MAX = 30;
export const SERVICE_RESERVATION_DAYS_MIN = 0;


export const numberNotInRage = (value, { min, max }) => {
  const numbericValue = parseInt(value);
  if (numbericValue.isNaN) return null;
  if (numbericValue < max && numbericValue > min) {
    return `請填 0 或大於 ${max} 以上的數字`;
  }
  return null;
};
validate.validators.numberNotInRage = numberNotInRage;

export default {
  title: {
    presence: {
      message: '^請輸入',
    },
    length: {
      maximum: 30,
      tooLong: '^請短於%{count}個字',
    },
  },
  descript: {
    presence: {
      message: '^請輸入',
    },
    length: {
      maximum: 250,
      tooLong: '^請短於%{count}個字',
    },
  },
  cityArea: {
    presence: {
      message: '請選擇地區',
    },
  },
  address: {
    presence: {
      message: '^請輸入詳細地址',
    },
  },
  category: {
    presence: {
      message: '請選擇分類',
    },
  },
  tag: {
    length: {
      maximum: 15,
      tooLong: '^請短於%{count}個字',
    },
  },
  price: {
    presence: {
      message: '^此欄位必填',
    },
    numericality: {
      notValid: '^請填數字',
      onlyInteger: true,
      notInteger: '^請填數字',
      lessThanOrEqualTo: PRICE_MAX,
      notLessThanOrEqualTo: `^請小於 ${formatCurrency(PRICE_MAX)}`,
      greaterThanOrEqualTo: PRICE_MIN,
      notGreaterThanOrEqualTo: `^至少要 ${formatCurrency(PRICE_MAX)}元以上的租金`,
    },
  },
  deposit: {
    presence: {
      message: '^請填押金，如不需要押金請填 0。',
    },
    numberNotInRage: { min: 1, max: 100 },
    numericality: {
      notValid: '^請填數字',
      onlyInteger: true,
      notInteger: '^請填數字',
      lessThanOrEqualTo: PRICE_MAX,
      notLessThanOrEqualTo: `^請小於 ${formatCurrency(PRICE_MAX)}`,
    },
  },
  serviceDates: {
    presence: {
      message: '^請選擇開始及結束日期',
    },
  },
  serviceUnit: {
    presence: {
      message: '^請填人數',
    },
    numericality: {
      notValid: '^請填數字',
      onlyInteger: true,
      notInteger: '^請填數字',
      greaterThanOrEqualTo: SERVICE_UNIT_MIN,
      notGreaterThanOrEqualTo: '^至少一人',
    },
  },
  serviceReservationDays: {
    numericality: {
      notValid: '^請填數字',
      onlyInteger: true,
      notInteger: '^請填數字',
      greaterThanOrEqualTo: SERVICE_RESERVATION_DAYS_MIN,
      notGreaterThanOrEqualTo: `^至少大於 ${SERVICE_RESERVATION_DAYS_MIN}`,
      lessThanOrEqualTo: SERVICE_RESERVATION_DAYS_MAX,
      notLessThanOrEqualTo: `^最多 ${SERVICE_RESERVATION_DAYS_MIN}`,
    },
  },
  discount: price => ({
    numericality: {
      notValid: '^請填數字',
      onlyInteger: true,
      notInteger: '^請填數字',
      lessThanOrEqualTo: parseInt(price, 10),
      notLessThanOrEqualTo: `^不可超過設定價格 ${formatCurrency(price)}`,
    },
  }),
  regulation: {},
};