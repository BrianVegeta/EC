/* eslint-disable camelcase */
import PriceUnit from 'models/ItemPriceUnit';
import DeliveryOptions from 'models/DeliveryOptions';

export default class {
  constructor(detail, dispatch) {
    this.dispatch = dispatch;
    this.coverUrl = `url(${detail.img1})`;
    this.pname = detail.pname;
    const PriceUnitInstance = new PriceUnit(detail.calculate_charge_type, detail.price);
    this.priceDesc = PriceUnitInstance.price;
    this.priceUnit = PriceUnitInstance.unit;

    this.sendOptions = DeliveryOptions.decode(detail.send_option);
    this.sendOptionsIsAlone = (this.sendOptions.length === 1);
    this.sendOptionsDesc = this.sendOptions[0].text;

    this.returnOptions = DeliveryOptions.decode(detail.return_option);
    this.returnOptionsIsAlone = (this.returnOptions.length === 1);
    this.returnOptionsDesc = this.returnOptions[0].text;
  }
}
