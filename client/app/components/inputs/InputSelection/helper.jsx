/* eslint-disable import/prefer-default-export */
import _ from 'lodash';

export const getChoiceFromValue = (options, value) => (
  _.find(options, { value })
);
