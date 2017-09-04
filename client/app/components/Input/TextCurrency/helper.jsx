import { isNumber, isNull, parseInt } from 'lodash';

export const toNumber = (numberString) => {
  if (isNumber(numberString)) return parseInt(numberString);
  return numberString;
};

export const constraintRange = (value, { max, min }) => {
  if (!isNull(max) && !isNumber(max)) throw new Error('max int');
  if (!isNull(min) && !isNumber(min)) throw new Error('min int');

  const number = parseInt(value);
  if (max && number > max) return max.toString();
  if (min && number < min) return min.toString();
  return value;
};
