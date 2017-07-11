import { formatDate, rangeDiff } from 'lib/time';

export default class {

  constructor(detail, reservation, dispatch) {
    this.dispatch = dispatch;
    const { startDate, endDate } = reservation;

    this.startDateStr = formatDate(startDate);
    this.endDateStr = formatDate(endDate);
    this.days = rangeDiff(startDate, endDate);

    this.duringDesc = this.getDesc();
  }

  getDesc() {
    if (this.startDateStr === this.endDateStr) {
      return this.startDateStr;
    }
    return `${this.startDateStr} ~ ${this.endDateStr}（共${this.days}天）`;
  }
}
