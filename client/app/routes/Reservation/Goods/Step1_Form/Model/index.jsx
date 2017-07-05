/* eslint-disable camelcase */
import PriceUnit from 'models/ItemPriceUnit';
// import DeliveryOptions from 'models/DeliveryOptions';
import SendOptions from './SendOptions';
import ReturnOptions from './ReturnOptions';

export default class {
  constructor(detail, reservation, dispatch) {
    this.dispatch = dispatch;
    this.coverUrl = `url(${detail.img1})`;
    this.pname = detail.pname;
    const PriceUnitInstance = new PriceUnit(detail.calculate_charge_type, detail.price);
    this.priceDesc = PriceUnitInstance.price;
    this.priceUnit = PriceUnitInstance.unit;

    this.sendOptions = new SendOptions(
      detail.send_option,
      reservation.sendOption,
      dispatch,
    );
    this.returnOptions = new ReturnOptions(
      detail.return_option,
      reservation.returnOption,
      dispatch,
    );
  }
}
