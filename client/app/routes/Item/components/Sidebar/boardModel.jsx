/* eslint-disable camelcase */
import { browserHistory } from 'react-router';
import { formatCurrency } from 'lib/currency';
import { formatDate } from 'lib/time';
import {
  reservationGoods as rsGoodsRouter,
  reservationService as rsServiceRouter,
  reservationSpace as rsSpaceRouter,
  reservationUsedGood as rsUsedGoodsRouter,
  publishGoodsRouter,
  publishServiceRouter,
  publishSpaceRouter,
  publishUsedGoodsRouter,
} from 'lib/paths';


const CATE_GOODS = '1';
const CATE_SERVICE = '2';
const CATE_SPACE = '3';
const FIX_CHARGE_TYPE = 'fix';
const ASSIGN_BY_OWNER = '0';
const ASSIGN_BY_CUSTOMER = '1';
export default class {

  static serviceAssignWay({ assign_address_type: type }) {
    const ways = [];
    if (type.includes(ASSIGN_BY_OWNER)) ways.push('到店服務');
    if (type.includes(ASSIGN_BY_CUSTOMER)) ways.push('到府服務');
    return ways.join('、');
  }

  // TODO: unit
  static discountUnit(type) {
    switch (type) {
      case 'GREATER_OR_EQUAL_TO_N_DAY':
        return '天';
      default:
        return '月';
    }
  }

  static redirectToReservation({ top_category, type, pid }) {
    let rsRouter = '/';
    switch (type) {
      case 'LEASE':
        rsRouter = {
          [CATE_GOODS]: rsGoodsRouter,
          [CATE_SERVICE]: rsServiceRouter,
          [CATE_SPACE]: rsSpaceRouter,
        }[top_category];
        break;
      case 'USED_ITEM':
        rsRouter = publishUsedGoodsRouter;
        break;
      default:
        break;
    }
    return () => browserHistory.push(rsRouter.indexPath(pid));
  }

  static editPublish({ top_category, type, pid }) {
    let publishRouter = '/';
    switch (type) {
      case 'LEASE':
        publishRouter = {
          [CATE_GOODS]: publishGoodsRouter,
          [CATE_SERVICE]: publishServiceRouter,
          [CATE_SPACE]: publishSpaceRouter,
        }[top_category];
        break;
      case 'USED_ITEM':
        publishRouter = rsUsedGoodsRouter;
        break;
      default:
        break;
    }

    return () => browserHistory.push(publishRouter.indexPath(pid));
  }

  static renderMinLeaseCostDesc({ min_lease_days, price }) {
    const total = formatCurrency(min_lease_days * price);
    return `最少租借${min_lease_days}天，共計${total}`;
  }

  constructor(detail, isMyOwn) {
    const {
      // uid,
      // pid,
      discounts,
      top_category,
      min_lease_days,
      // price,
      deposit,
      calculate_charge_type,
      leasestart,
      leaseend,
      // assign_address_type,
      unit,
    } = detail;

    this.isMyOwn = isMyOwn;
    this.topCategory = top_category;
    this.discounts = discounts && discounts.map(discount =>
      this.formatDiscount(discount, top_category),
    );
    this.deposit = `押金：${formatCurrency(deposit)}`;
    this.payment = '第三方安全支付 ，信用卡、ATM轉帳';

    const {
      redirectToReservation,
      serviceAssignWay,
      renderMinLeaseCostDesc,
      editPublish,
    } = this.constructor;
    this.onReserve = redirectToReservation(detail);
    this.onEdit = editPublish(detail);

    switch (top_category) {
      case CATE_GOODS:
        this.minCostDesc = min_lease_days > 0 && renderMinLeaseCostDesc(detail);
        break;

      case CATE_SERVICE:
        if (calculate_charge_type === FIX_CHARGE_TYPE) {
          const leasestartDate = formatDate(leasestart);
          const leaseendDate = formatDate(leaseend);
          this.dateRange = `活動日期：${leasestartDate}～${leaseendDate}`;
          this.amountRemaining = `最後剩餘名額：${unit}人（限一人一單）`;
        }
        this.serviceAssignWay = `服務方式：${serviceAssignWay(detail)}`;
        break;

      case CATE_SPACE:
        break;

      default:
        throw new Error('Invalid topCategory');
    }
  }

  formatDiscount({ type, param, discount }, topCategory) {
    switch (topCategory) {
      case CATE_GOODS:
        return {
          text: `只要租${param}天，每天優惠價`,
          price: formatCurrency(discount),
        };
      case CATE_SERVICE:
        return {
          text: '只要預訂，優惠價',
          price: formatCurrency(discount),
        };
      default: {
        const { discountUnit } = this.constructor;
        const unit = discountUnit(type);
        return {
          text: `只要租${param}${unit}，每${unit}優惠價`,
          price: formatCurrency(discount),
        };
      }
    }
  }
}
