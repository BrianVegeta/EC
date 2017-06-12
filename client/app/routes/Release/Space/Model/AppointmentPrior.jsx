import {
  updateAppointmentRrior,
} from '../../../../actions/publishActions';

class AppointmentPrior {
  constructor(props, dispatch) {
    this.dispatch = dispatch;
    this.value = props;
    this.options = [1, 2, 3, 4, 5, 6, 7].map(n =>
      ({ value: n, text: `提早${n}天前預約` }),
    );
    this.update = this.update.bind(this);
  }
  update(option) {
    this.dispatch(updateAppointmentRrior(option.value));
  }
  isValid() {
    return true;
  }
}
export default AppointmentPrior;
