import _ from 'lodash';

export default class {
  constructor(startDate, endDate, dispatch) {
    this.startDate = startDate;
    this.endDate = endDate;
    this.dispatch = dispatch;
    this.startDateText = this.startDate ? this.startDate.format('YYYY/MM/DD') : null;
    this.endDateText = this.endDate ? this.endDate.format('YYYY/MM/DD') : null;

    this.validator = this.validator.bind(this);
  }

  // onDatesChange({ startDate, endDate })

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
