import numeral from 'numeral';

const TOTLE_PRICE_LIMIT = 99999;
export default {
  price: {
    presence: {
      message: '^此欄位必填',
    },
    numericality: {
      onlyInteger: true,
      notInteger: '^請填數字',
      lessThanOrEqualTo: TOTLE_PRICE_LIMIT,
      notLessThanOrEqualTo: `^請小於 ${numeral(TOTLE_PRICE_LIMIT).format('$0,000')}`,
    },
  },
  deposit: {
    presence: {
      message: '^此欄位必填',
    },
    numericality: {
      onlyInteger: true,
      notInteger: '^請填數字',
      lessThanOrEqualTo: TOTLE_PRICE_LIMIT,
      notLessThanOrEqualTo: `^請小於 ${numeral(TOTLE_PRICE_LIMIT).format('$0,000')}`,
    },
  },
  minLeaseDays: {
    presence: {
      message: '^此欄位必填',
    },
    numericality: {
      onlyInteger: true,
      notInteger: '^請填數字',
      lessThanOrEqualTo: 30,
      notLessThanOrEqualTo: '^最多30天',
      greaterThanOrEqualTo: 1,
      notGreaterThanOrEqualTo: '^最少1天',
    },
  },
};
