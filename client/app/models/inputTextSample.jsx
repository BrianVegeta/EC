// import validate from 'validate.js';
// import { changeFormData } from 'actions/reservationActions';
// import constraints from './constraints';
//
// export default class {
//
//   constructor(reservation, dispatch) {
//     const { contactPhone } = reservation;
//     this.value = contactPhone;
//     this.dispatch = dispatch;
//
//     this.onChange = this.onChange.bind(this);
//     this.validator = this.validator.bind(this);
//   }
//
//   onChange(value) {
//     this.dispatch(
//       changeFormData({ contactName: value }),
//     );
//   }
//
//   validator() {
//     return validate.single(this.value, constraints.contactPhone);
//   }
// }
