/* eslint-disable camelcase */
import PriceUnit from 'models/ItemPriceUnit';
import SendOptions from './SendOptions';
import SendAddresses from './SendAddresses';
import ReturnOptions from './ReturnOptions';
import DatesRange from './DatesRange';
import Amount from './Amount';
import Coupons from './Coupons';
import Calculation from './Calculation';
import ContactName from './ContactName';
import ContactPhone from './ContactPhone';
import Note from './Note';
import PaymentType from './PaymentType';

export default class {
  constructor(detail, reservation, myCoupons, dispatch) {
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
    this.sendAddresses = new SendAddresses(
      reservation,
      dispatch,
    );
    this.returnOptions = new ReturnOptions(
      detail.return_option,
      reservation.returnOption,
      dispatch,
    );

    this.datesRange = new DatesRange(
      detail,
      reservation,
      dispatch,
    );

    this.amountModel = new Amount(
      detail,
      reservation,
      dispatch,
    );

    this.couponsModel = new Coupons(
      myCoupons,
      reservation,
      dispatch,
    );

    this.calculationModel = new Calculation(
      detail,
      reservation,
      dispatch,
    );

    this.contactModel = {
      name: new ContactName(reservation, dispatch),
      phone: new ContactPhone(reservation, dispatch),
    };

    this.noteModel = new Note(reservation, dispatch);
    this.paymenttype = new PaymentType(reservation, dispatch);
  }
}
