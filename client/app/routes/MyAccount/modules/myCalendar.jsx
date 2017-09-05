import { asyncXhrAuthedPost } from 'lib/xhr';

/* =============================================>>>>>
= userprofile =
===============================================>>>>>*/

const ACTION_PREFIX = 'MY.CALENDAR';
const REDUCER_KEY = 'myCalendar';

// =============================================
// = action type =
// =============================================

const prefix = action => (`${ACTION_PREFIX}.${action}`);

export const FETCHED = prefix('FETCHED');
export const FETCHING = prefix('FETCHING');
export const RESET = prefix('RESET');

// =============================================
// = actions =
// =============================================

const fetching = () => ({
  type: FETCHING,
});

const fetched = records => ({
  type: FETCHED,
  records,
});

export const reset = () => ({
  type: RESET,
});

export function fetchCalendar(startDate, endDate) {
  return (dispatch, getState) => {
    const { auth } = getState();
    const { currentUser } = auth;
    dispatch(fetching());
    asyncXhrAuthedPost(
      '/ajax/get_calendar.json',
      {
        start_date: startDate,
        end_date: endDate,
        uid: currentUser.uid,
      },
      getState(),
    )
    .then((responseData) => {
      dispatch(fetched(responseData));
    });
  };
}


// =============================================
// = reducer =
// =============================================

const initialState = {
  isFetching: false,
  records: [],
};

export default (state = initialState, action) => {
  switch (action.type) {
    case FETCHING:
      return Object.assign({}, state, {
        records: [],
        isFetching: true,
      });

    case FETCHED:
      return Object.assign({}, state, {
        isFetching: false,
        records: action.records,
      });

    case RESET:
      return initialState;

    default:
      return state;
  }
};
