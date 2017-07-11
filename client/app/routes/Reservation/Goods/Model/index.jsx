/* eslint-disable camelcase */
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
import ItemCard from './ItemCard';
import During from './During';

export default class {
  constructor(detail, reservation, myCoupons, dispatch) {
    this.dispatch = dispatch;

    this.itemCardModel = new ItemCard(
      detail,
      reservation,
      dispatch,
    );

    this.ownerModel = {
      avatarSrc: detail.ownerProfile.picture,
      username: detail.ownerProfile.name,
      uid: detail.uid,
    };

    this.useDuringModel = new During(
      detail,
      reservation,
      dispatch,
    );

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
