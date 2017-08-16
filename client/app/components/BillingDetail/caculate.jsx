/* eslint-disable camelcase */

import { rangeDiff } from 'lib/time';
import { formatCurrency } from 'lib/currency';

const CHARGE_TYPE_FIX = 'fix';
const CHARGE_TYPE_COUNT = 'count';
const CHARGE_TYPE_DAY = 'day';

const formatDetail = (text, amount) => ({ text, amount });

// 計算價格
const calPrice = ({ days, unit, price }, chargeType) => {
  switch (chargeType) {
    case CHARGE_TYPE_FIX:
      return formatDetail(
        `價格 ${formatCurrency(price)}`,
        price,
      );

    case CHARGE_TYPE_DAY:
      return formatDetail(
        `價格 ${formatCurrency(price)} x ${days}天`,
        price * days,
      );

    case CHARGE_TYPE_COUNT:
      return formatDetail(
        `價格 ${formatCurrency(price)} x ${unit}個（件）`,
        price * unit,
      );

    default:
      throw new Error('SERVICE WRONG TYPE');
  }
};

// 計算
const calDeposit = ({ deposit }) => {
  if (!deposit) return null;

  return formatDetail('押金', deposit);
};

// 計算折扣
const calCoupon = ({ couponOffset }) => {
  if (!couponOffset) return null;

  return formatDetail('折價券', couponOffset);
};

// 計算折扣
const calDiscounts = ({ discounts }) => {
  if (discounts.length === 0) return null;

  const { discount } = discounts[0]
  return formatDetail(`優惠價 ${discount}`, discount);
};

export default (
  {
    calculate_charge_type, price, deposit, discounts,
    startDate, endDate, unit,
  },
  couponOffset,
) => {
  let total = 0;
  const days = (startDate && endDate) ?
    rangeDiff(startDate, endDate, true) : 1;

  const priceDetail = calPrice(
    { days, unit, price },
    calculate_charge_type,
  );
  total += priceDetail.amount;

  const depositDetail = calDeposit({ deposit });
  if (depositDetail) {
    total += depositDetail.amount;
  }

  const couponDetail = calCoupon({ couponOffset });
  if (couponDetail) {
    total -= couponDetail;
  }

  const discountDetail = calDiscounts({ discounts });

  // [CHARGE_TYPE_FIX]: '次',
  // [CHARGE_TYPE_DAY]: '天',
  // [CHARGE_TYPE_COUNT]: '人',


  return {
    priceDetail,
    depositDetail,
    couponDetail: null,
    discountDetail: null,
    total,
  };
};
