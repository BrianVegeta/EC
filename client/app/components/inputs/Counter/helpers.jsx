
export function isBlankString(value) {
  return value === '';
}

export function stringToNumber(value) {
  const number = parseInt(value, 10);
  if (Number.isNaN(number)) {
    throw new Error('Not a number string!');
  }
  return number;
}

export function checkInteger(value) {
  if (/^\d+$/.test(value)) return value;

  throw new Error('Not a number string!');
}
