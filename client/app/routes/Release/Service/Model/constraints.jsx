import numeral from 'numeral';
import _ from 'lodash';
import { PRICE_MIN, PRICE_MAX } from '../../../../constants/limit';

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
export const constrainter = (price = PRICE_MAX) => ({
  title: {
    presence: {
      message: '^此欄位必填',
    },
    length: {
      maximum: 30,
      tooLong: '^請在%{count}個字以內',
    },
  },
  descript: {
    presence: {
      message: '^此欄位必填',
    },
    length: {
      maximum: 250,
      tooLong: '^請在%{count}個字以內',
    },
  },
  cityarea: {
    presence: {
      message: '^此欄位必填',
    },
  },
  address: {
    presence: {
      message: '^此欄位必填',
    },
  },
  amount: {
    presence: {
      message: '^此欄位必填',
    },
  },
  categoryId: {
    presence: {
      message: '^此欄位必填',
    },
  },
  assignmentOptions: {
    presence: {
      message: '^至少選一項',
    },
  },
  price: {
    presence: {
      message: '^此欄位必填',
    },
    numericality: {
      onlyInteger: true,
      notInteger: '^請填數字',
      lessThanOrEqualTo: PRICE_MAX,
      notLessThanOrEqualTo: `^請小於 ${numeral(PRICE_MAX).format('$0,000')}`,
      greaterThanOrEqualTo: PRICE_MIN,
      notGreaterThanOrEqualTo: `^至少要${PRICE_MIN}元以上的租金`,
    },
  },
  deposit: {
    presence: {
      message: '^請填押金，如不需要押金請填 0。',
    },
    numberNotInRage: [1, 100],
    numericality: {
      onlyInteger: true,
      notInteger: '^請填數字',
      lessThanOrEqualTo: PRICE_MAX,
      notLessThanOrEqualTo: `^請小於 ${numeral(PRICE_MAX).format('$0,000')}`,
    },
  },
  totalPay: {
    numericality: {
      onlyInteger: true,
      notInteger: '^請填數字',
      lessThanOrEqualTo: PRICE_MAX,
      notLessThanOrEqualTo: `總額不得超過 ${numeral(PRICE_MAX).format('$0,000')}`,
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
  serviceDiscount: {
    numericality: {
      onlyInteger: true,
      notInteger: '^請填數字',
      lessThanOrEqualTo: _.parseInt(price),
      notLessThanOrEqualTo: '^不能超過',
      greaterThanOrEqualTo: 1,
      notGreaterThanOrEqualTo: '^最低1元或不填',
    },
  },
});
export default constrainter();
