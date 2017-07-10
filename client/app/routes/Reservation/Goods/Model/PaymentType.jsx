import {
  PAYMENTTYPE_ATM,
  PAYMENTTYPE_CREDIT_CARD,
} from 'constants/enums';
import { changeFormData } from 'actions/reservationActions';

export default class {

  constructor(reservation, dispatch) {
    const { paymenttype } = reservation;

    this.dispatch = dispatch;
    this.paymenttype = paymenttype;
    this.isAtm = (paymenttype === PAYMENTTYPE_ATM);
    this.isCreditCard = (paymenttype === PAYMENTTYPE_CREDIT_CARD);

    this.onAtmChange = this.onAtmChange.bind(this);
    this.onCreditCardChange = this.onCreditCardChange.bind(this);
  }

  onAtmChange() {
    const paymenttype = (this.isAtm ? null : PAYMENTTYPE_ATM);

    this.dispatch(
      changeFormData({ paymenttype }),
    );
  }

  onCreditCardChange() {
    const paymenttype = (this.isCreditCard ? null : PAYMENTTYPE_CREDIT_CARD);

    this.dispatch(
      changeFormData({ paymenttype }),
    );
  }
}
