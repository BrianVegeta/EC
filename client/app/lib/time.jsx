/* eslint-disable import/prefer-default-export */
import moment from 'moment';
import { extendMoment } from 'moment-range';

moment.locale('zh-tw');
const DATE_FORMAT = 'YYYY/MM/DD';

export function formatDate(number) {
  return moment(number).format(DATE_FORMAT);
}

export function isToday(momentObj) {
  return momentObj.isSame(moment(), 'd');
}

export function today() {
  return moment();
}

/* xxx days(hours, minuts) ago */
export function fromNow(time) {
  return moment(time).fromNow();
}

export function relativeTime(time) {
  const now = moment().unix();
  const timeAt = moment(parseInt(time, 10)).unix();
  const hours36 = 36 * 24 * 3600;
  if ((now - timeAt) > hours36) {
    return formatDate(time);
  }

  return moment(parseInt(time, 10)).fromNow();
}

const momentRange = extendMoment(moment);
export function inDates(theDate, startDate, endDate) {
  const range = momentRange.range(startDate, endDate);
  return range.contains(theDate);
}
export function rangeDiff(startDate, endDate, included) {
  if (!startDate) throw new Error('startDate null!');
  if (!endDate) throw new Error('endDate null!');

  const diff = momentRange.range(startDate, endDate).diff('days');
  if (included) {
    return diff + 1;
  }
  return diff;
}
