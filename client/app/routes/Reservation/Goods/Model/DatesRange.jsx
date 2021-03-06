/* eslint-disable camelcase */
// import validate from 'validate.js';
import DatesPicker from 'models/DatesPicker';
import { changeDates } from 'actions/reservationActions';
// import constraints from './constraints';

export default class extends DatesPicker {
  constructor(detail, reservation, dispatch) {
    const { startDate, endDate } = reservation;
    super(startDate, endDate, dispatch);

    const {
      ship_before_start_days,
      min_lease_days,
    } = detail;

    this.preparation = ship_before_start_days;
    this.minPicks = min_lease_days;
    this.onDatesChange = this.onDatesChange.bind(this);
    this.validator = this.validator.bind(this);
  }

  onDatesChange(dates) {
    this.dispatch(
      changeDates(dates),
    );
  }

  validator() {
    if (!this.startDate || !this.endDate) {
      return ['請填完整使用時間'];
    }
    return [];
    // return validate.single(this.value, constraints.datesRange);
  }
}
