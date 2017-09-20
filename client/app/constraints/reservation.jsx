import publish from './publish';

const {
  serviceDates,
  cityArea,
  address,
  storeid,
} = publish;

export default {
  dates: serviceDates,
  cityArea,
  address,
  storeid,
  serviceLocationType: {
    presence: {
      message: '^請選擇服務方式',
    },
  },
  unit: itemUnit => ({
    presence: {
      message: '^請填數量',
    },
    numericality: {
      notValid: '^請填數字',
      onlyInteger: true,
      notInteger: '^請填數字',
      greaterThanOrEqualTo: 1,
      notGreaterThanOrEqualTo: '^至少大於 1',
      lessThanOrEqualTo: itemUnit,
      notLessThanOrEqualTo: `^數量不可超過目前物品數量：${itemUnit}`,
    },
  }),
  note: {},
  sendType: {
    presence: {
      message: '^請選擇到貨方式',
    },
  },
  returnType: {
    presence: {
      message: '^請選擇寄還方式',
    },
  },
};
