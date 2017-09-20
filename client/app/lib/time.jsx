/* eslint-disable import/prefer-default-export */
import moment from 'moment';
import { extendMoment } from 'moment-range';

moment.locale('zh-tw');
const DATE_FORMAT = 'YYYY/MM/DD';
const DATE_FORMAT_FOR_ORDER = 'MM/DD(dddd)';
export function getMoment(number) {
  return moment(number);
}

export function formatDate(number, format = DATE_FORMAT) {
  return moment(number).format(format);
}

export function formatDateForOrder(number) {
  return moment(number).format(DATE_FORMAT_FOR_ORDER);
}

export function isToday(momentObj) {
  return momentObj.isSame(moment(), 'd');
}

export function today() {
  return moment();
}

export function yesterday() {
  return moment().add(-1, 'days');
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

export function monthDiff(startDate, endDate) {
  if (!startDate) throw new Error('startDate null!');
  if (!endDate) throw new Error('endDate null!');
  const diff = getMoment(endDate).diff((startDate), 'months', true);
  return Math.round(diff);
}


export const now = () => moment().valueOf();
export {
  moment,
};
