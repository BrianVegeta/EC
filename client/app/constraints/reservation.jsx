import publish from './publish';

const {
  serviceDates,
  cityArea,
  address,
} = publish;

export default {
  dates: serviceDates,
  cityArea,
  address,
  serviceLocationType: {
    presence: {
      message: '^請選擇服務方式',
    },
  },
  unit: itemUnit => ({
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
};
