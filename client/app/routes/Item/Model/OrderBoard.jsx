/* eslint-disable camelcase */
import { formatCurrency } from 'lib/currency';
import { formatDate } from 'lib/time';

const CATE_GOODS = '1';
const CATE_SERVICE = '2';
const CATE_SPACE = '3';
const FIX_CHARGE_TYPE = 'fix';
const ASSIGN_ADDRESS_BY_OWNER = '0';
const ASSIGN_ADDRESS_BY_USER = '1';

export default class {
  static serviceAssignWay(type) {
    switch (type) {
      case ASSIGN_ADDRESS_BY_OWNER:
        return '請親自前往地點';
      case ASSIGN_ADDRESS_BY_USER:
        return '到府服務';
      default:
        return '';
    }
  }
  static discountUnit(type) {
    switch (type) {
      case 'GREATER_OR_EQUAL_TO_N_DAY':
        return '天';
      default:
        return '月';
    }
  }
  constructor(detail, dispatch, currentUser) {
    const {
      uid,
      pid,
      discounts,
      top_category,
      min_lease_days,
      price,
      deposit,
      calculate_charge_type,
      leasestart,
      leaseend,
      assign_address_type,
      unit,
    } = detail;
    this.dispatch = dispatch;
    this.isMine = (currentUser.uid === uid);
    this.topCategory = top_category;
    this.discounts = discounts && discounts.map(discount => this.formatDiscount(discount));
    this.deposit = `押金：${formatCurrency(deposit)}`;
    this.payment = '第三方安全支付 ，信用卡、ATM轉帳';
    switch (top_category) {
      case CATE_GOODS:
        this.minCostDesc = min_lease_days > 0 &&
          `最少租借${min_lease_days}天，共計${formatCurrency(min_lease_days * price)}`;
        this.orderLink = (this.isMine ? '/' : `/p/reservation-goods/${pid}`);
        break;
      case CATE_SERVICE:
        switch (calculate_charge_type) {
          case FIX_CHARGE_TYPE:
            this.dateRange = `活動日期：${formatDate(leasestart)}～${formatDate(leaseend)}`;
            this.amountRemaining = `最後剩餘名額：${unit}人（限一人一單）`;
            break;
          default:
            this.dateRange = null;
        }
        this.serviceAssignWay = `服務方式：${this.constructor.serviceAssignWay(assign_address_type)}`;
        this.orderLink = (this.isMine ? '/' : `/p/reservation-service/${pid}`);
        break;
      case CATE_SPACE:
        this.orderLink = (this.isMine ? '/' : `/p/reservation-space/${pid}`);
        break;
      default:
        throw new Error('Invalid topCategory');
    }
  }
  minLeaseDay(days, price) {
    switch (this.topCategory) {
      case CATE_GOODS:
        return `最少租借${days}天，共計${formatCurrency(days * price)}`;
      default:
        return null;
    }
  }
  formatDiscount(discountDetail) {
    const { type, param, discount } = discountDetail;
    switch (this.topCategory) {
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
