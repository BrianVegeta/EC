import numeral from 'numeral';
import _ from 'lodash';
import { PRICE_MIN } from '../../../../constants/limit';

const TOTLE_PRICE_LIMIT = 99999;
export const numberNotInRage = (value, options) => {
  const min = options[0];
  const max = options[1];
  const numbericValue = _.parseInt(value);
  if (numbericValue.isNaN) return null;
  if (numbericValue < max && numbericValue > min) {
    return `請填 0 或大於 ${max} 以上的數字`;
  }
  return null;
};
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
      greaterThanOrEqualTo: PRICE_MIN,
      notGreaterThanOrEqualTo: `^至少要${PRICE_MIN}元以上的租金`,
    },
  },
  deposit: {
    presence: {
      message: '^此欄位必填',
    },
    numberNotInRage: [1, 100],
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
