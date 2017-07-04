import * as CHARGE_TYPES from 'constants/columnTypes/itemChargeTypes';
import { formatCurrency } from 'lib/currency';

export default class {
  static getUnit(chargeType) {
    switch (chargeType) {
      case CHARGE_TYPES.COUNT:
        return '件';
      case CHARGE_TYPES.DAY:
        return '天';
      case CHARGE_TYPES.MONTH:
        return '月';
      case CHARGE_TYPES.FIXED:
        return '次';
      default:
        return '';
    }
  }
  constructor(chargeType, price) {
    this.chargeType = chargeType;
    this.unit = this.constructor.getUnit(chargeType);
    this.price = formatCurrency(price);
  }
}
