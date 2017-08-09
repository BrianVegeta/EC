/* eslint-disable import/prefer-default-export */
import {
  map,
  filter,
} from 'lodash';


/* 分頁過濾重複資料 */
export const reduceDuplicateRecords = (newRecords, records, duplicateKey) => {
  const identities = map(records, record => record[duplicateKey]);
  return filter(newRecords, newRecord => !identities.includes(newRecord[duplicateKey]));
};
