/* eslint-disable import/prefer-default-export */
import _ from 'lodash';

export function unzip(state) {
  const unzipedOptions = [];
  _.forEach(_.split(state, ''), (value) => {
    const optionKey = _.parseInt(value);
    unzipedOptions[optionKey] = optionKey;
  });
  return unzipedOptions;
}
export function insertOption(state, optionKey) {
  const options = unzip(state);
  const optionKeyInt = _.parseInt(optionKey);
  options[optionKeyInt] = optionKeyInt;
  return options.join('');
}
export function removeOption(state, optionKey) {
  const options = unzip(state);
  const optionKeyInt = _.parseInt(optionKey);
  delete options[optionKeyInt];
  return options.join('');
}
