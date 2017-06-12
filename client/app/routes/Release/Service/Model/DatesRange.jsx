import _ from 'lodash';
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
    this.startDateText = this.startDate ? this.startDate.format('YYYY/MM/DD') : null;
    this.endDateText = this.endDate ? this.endDate.format('YYYY/MM/DD') : null;
    this.updateStartDate = this.updateStartDate.bind(this);
    this.updateEndDate = this.updateEndDate.bind(this);
    this.updateDatesRange = this.updateDatesRange.bind(this);
    this.validator = this.validator.bind(this);
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
  validator() {
    if (_.isEmpty(this.startDate) && _.isEmpty(this.endDate)) {
      return ['請填開始時間及結束時間'];
    }
    if (_.isEmpty(this.startDate)) {
      return ['請填開始時間'];
    }
    if (_.isEmpty(this.endDate)) {
      return ['請填結束時間'];
    }
    return [];
  }
  isValid() {
    return !_.isEmpty(this.startDate) && !_.isEmpty(this.endDate);
  }
}
export default DatesRange;
