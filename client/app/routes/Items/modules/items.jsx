import { asyncXhrPost } from 'lib/xhr';
import { reduceDuplicateRecords } from 'lib/utils';
// import { inCollection, REDUCER_KEY as COLLECTION_KEY } from 'modules/myCollection';
import { find } from 'lodash';
import { LEASE, USED_ITEM } from 'constants/enums';
import {
  REDUCER_KEY as FILTER_REDUCER_KEY,
  mapSortParams,
} from 'modules/filter';

/* =============================================>>>>>
= settings =
===============================================>>>>>*/
const ACTION_PREFIX = 'ITEMS';
const REDUCER_KEY = 'items';
const COLLECTION_KEY = 'myCollection';
const SIZE = 21;
const DUPLICATE_KEY = 'pid';


// =============================================
// = action type =
// =============================================
const prefix = action => (`${ACTION_PREFIX}.${action}`);

export const FETCHING = prefix('FETCHING');
export const FETCHED = prefix('FETCHED');
export const COUNT_RECURSIVE_TIMES = prefix('COUNT_RECURSIVE_TIMES');
export const RESET_RECURSIVE_TIMES = prefix('RESET_RECURSIVE_TIMES');
export const RESET = prefix('RESET');


// =============================================
// = actions =
// =============================================
const fetching = expireFlag => ({
  type: FETCHING,
  expireFlag,
});

const fetched = records => ({
  type: FETCHED,
  records,
});

function checkExpire(records, expireFlag) {
  return (dispatch, getState) => {
    if (expireFlag !== getState()[REDUCER_KEY].expireFlag) {
      return;
    }
    const collection = getState()[COLLECTION_KEY].records;
    dispatch(fetched(records.map(record =>
      Object.assign({}, record, {
        in_my_favorite: Boolean(find(collection, { pid: record.pid })),
      }),
    )));
  };
}

const countRecursiveTimes = () => ({
  type: COUNT_RECURSIVE_TIMES,
});

const resetRecursiveTimes = () => ({
  type: RESET_RECURSIVE_TIMES,
});

export const reset = () => ({
  type: RESET,
});


const RECURSIVE_LIMIT = 10;
/**
 *
 * @index
 * @size
 *
 * recursive pagin items
 */
export function fetchRecords(categoryID, isUsed, recursiveRecords = []) {
  return (dispatch, getState) => {
    const {
      size,
      index,
      records,
      recursiveTimes,
    } = getState()[REDUCER_KEY];
    const {
      price: { max, min },
      sort,
      sendOption,
      locations,
    } = getState()[FILTER_REDUCER_KEY];
    const requestParams = {
      type: isUsed ? USED_ITEM : LEASE,
      index: (index + recursiveRecords.length),
      size: (size - recursiveRecords.length),
      category_id: categoryID,
      price_max: max,
      price_min: min,
      sort: mapSortParams(sort),
      send_option: sendOption,
      locations: locations.map(city => ({ city, area: '' })),
    };

    /* 增加 RECURSIVE 次數 */
    dispatch(countRecursiveTimes());
    /* LOADING FETCH */
    const expireFlag = Date.now();
    dispatch(fetching(expireFlag));
    /* API REQUEST */
    asyncXhrPost(
      '/ajax/item/list.json',
      requestParams,
    )
    .then((data) => {
      const resultData = data;

      const reducedRecords = reduceDuplicateRecords(data, records, DUPLICATE_KEY);
      if (reducedRecords.length < resultData.length && recursiveTimes <= RECURSIVE_LIMIT) {
        /* RECURSIVE AGAIN */
        dispatch(fetchRecords(categoryID, isUsed, reducedRecords));
        return;
      }
      /* RESET RECURSIVE FREQUENCY */
      dispatch(resetRecursiveTimes());
      /* CHANGE RECORDS IN REDUCER */
      dispatch(checkExpire(resultData.concat(recursiveRecords), expireFlag));
    });
  };
}


// =============================================
// = reducer =
// =============================================
const initialState = {
  expireFlag: null,
  isPaginable: true,
  isFetching: false,
  records: [],
  size: SIZE,
  index: 0,
  recursiveTimes: 0,
};

export default (state = initialState, action) => {
  switch (action.type) {
    case FETCHING:
      return Object.assign({}, state, {
        isFetching: true,
        expireFlag: action.expireFlag,
      });

    case FETCHED:
      return Object.assign({}, state, {
        isFetching: false,
        isPaginable: action.records.length === state.size,
        records: state.records.concat(action.records),
        index: state.index + action.records.length,
      });

    case COUNT_RECURSIVE_TIMES:
      return Object.assign({}, state, {
        recursiveTimes: state.recursiveTimes + 1,
      });

    case RESET_RECURSIVE_TIMES:
      return Object.assign({}, state, {
        recursiveTimes: 0,
      });

    case RESET:
      return initialState;

    default:
      return state;
  }
};
