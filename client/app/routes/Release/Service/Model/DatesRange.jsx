import {
  updateStartDate,
  updateEndDate,
  updateDatesRange,
} from '../../../../actions/publishActions';

class DatesRange {
  constructor(startDate, endDate, dispatch) {
    this.startDate = startDate;
    this.endDate = endDate;
    this.dispatch = dispatch;
    this.updateStartDate = this.updateStartDate.bind(this);
    this.updateEndDate = this.updateEndDate.bind(this);
    this.updateDatesRange = this.updateDatesRange.bind(this);
  }
  updateStartDate(startDate) {
    this.dispatch(
      updateStartDate(startDate),
    );
  }
  updateEndDate(endDate) {
    this.dispatch(
      updateEndDate(endDate),
    );
  }
  updateDatesRange({ startDate, endDate }) {
    this.dispatch(
      updateDatesRange(startDate, endDate),
    );
  }
}
export default DatesRange;
