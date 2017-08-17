/* eslint-disable camelcase */

import { rangeDiff } from 'lib/time';
import { formatCurrency } from 'lib/currency';

const CHARGE_TYPE_FIX = 'fix';
const CHARGE_TYPE_COUNT = 'count';
const CHARGE_TYPE_DAY = 'day';

const formatDetail = (text, amount) => ({ text, amount });

// 計算價格
const calPrice = ({ leasestart, leaseend, unit, price }, chargeType) => {
  switch (chargeType) {
    // 固定價格
    case CHARGE_TYPE_FIX:
      return formatDetail(
        `價格 ${formatCurrency(price, '')}`,
        price,
      );

    // 天數計算
    case CHARGE_TYPE_DAY: {
      const days = (leasestart && leaseend) ?
        rangeDiff(leasestart, leaseend, true) : 1;
      return formatDetail(
        `價格 ${formatCurrency(price, '')} x ${days}天`,
        price * days,
      );
    }

    // 數量計算
    case CHARGE_TYPE_COUNT:
      return formatDetail(
        `價格 ${formatCurrency(price, '')} x ${unit}個（件）`,
        price * unit,
      );

    default:
      throw new Error('SERVICE WRONG TYPE');
  }
};

// 計算押金
const calDeposit = ({ deposit }) => {
  if (!deposit) return null;

  return formatDetail('押金', deposit);
};

// 計算 COUPON
const calCoupon = ({ couponOffset }) => {
  if (!couponOffset) return null;

  return formatDetail('折價券', couponOffset);
};

// 計算折扣
const calDiscounts = ({ discounts }) => {
  if (discounts.length === 0) return null;

  const { discount } = discounts[0];
  return formatDetail(`優惠價 ${formatCurrency(discount, '')}`, discount);
};


/* DEFAULT */
export default (
  {
    calculate_charge_type,
    price, deposit, discounts,
    leasestart, leaseend, unit,
  },
  couponOffset,
) => {
  const priceParams = { leasestart, leaseend, unit: (unit || 1), price };
  const priceDetail = calPrice(priceParams, calculate_charge_type);

  const discountDetail = calDiscounts({ discounts });
  const total = discountDetail ? discountDetail.amount : priceDetail.amount;

  const depositDetail = calDeposit({ deposit });
  const depositAmount = depositDetail ? depositDetail.amount : 0;

  const couponDetail = calCoupon({ couponOffset });
  const couponAmount = couponDetail ? couponDetail.amount : 0;

  return {
    priceDetail,
    depositDetail,
    couponDetail,
    discountDetail,
    total: total + Math.max(depositAmount - couponAmount, 0),
  };
};
