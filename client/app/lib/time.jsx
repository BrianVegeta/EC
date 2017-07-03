/* eslint-disable import/prefer-default-export */
import moment from 'moment';

const DATE_FORMAT = 'YYYY/MM/DD';

export function formatDate(number) {
  return moment(number).format(DATE_FORMAT);
}
