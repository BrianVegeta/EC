import numeral from 'numeral';
import { LIMIT } from '../../../../constants';

export default function discounts(price) {
  return {
    days: {
      presence: {
        message: '^此欄位必填',
      },
      numericality: {
        onlyInteger: true,
        notInteger: '^請填數字',
      },
    },
    offer: {
      presence: {
        message: '^此欄位必填',
      },
      numericality: {
        onlyInteger: true,
        notInteger: '^請填數字',
        lessThanOrEqualTo: price,
        notLessThanOrEqualTo: `^不得超過押金（ ${numeral(price).format('$0,000')}）`,
        greaterThan: LIMIT.PRICE_MIN,
        notGreaterThan: `^至少要${LIMIT.PRICE_MIN}元以上的租金`,
      },
    },
  };
}
