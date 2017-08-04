/* eslint-disable import/prefer-default-export */
import numeral from 'numeral';

const CURRENCY_FORMAT = '$0,000';
export function formatCurrency(number, prefixUnit = 'NTD') {
  return `${prefixUnit}${numeral(number).format(CURRENCY_FORMAT)}`;
}
