/* eslint-disable import/prefer-default-export */
import _ from 'lodash';

export const getChoiceFromValue = (options, value) => {
  const result = _.find(options, { value });
  if (result === undefined) return null;

  return result;
};
