/* eslint-disable import/prefer-default-export */
import {
  find,
} from 'lodash';

export const getChoiceFromValue = (options, value) => {
  const result = find(options, { value });
  if (result === undefined) return null;

  return result;
};
