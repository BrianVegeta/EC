import PriceUnit from 'models/ItemPriceUnit';

export default class {

  constructor(detail, reservation, dispatch) {
    this.dispatch = dispatch;

    this.serialNumber = reservation.cid;
    this.cover = detail.img1;
    this.pname = detail.pname;
    const PriceUnitInstance = new PriceUnit(
      detail.calculate_charge_type,
      detail.price,
    );
    this.priceDesc = PriceUnitInstance.price;
    this.priceUnit = PriceUnitInstance.unit;
  }
}
