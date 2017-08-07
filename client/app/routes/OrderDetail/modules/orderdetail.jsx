import { asyncXhrAuthedPost } from 'lib/xhr';


// =============================================
// = action type =
// =============================================
const prefix = action => (`ORDERDETAIL.${action}`);

export const FETCHED = prefix('FETCHED');
export const FETCHING = prefix('FETCHING');

// =============================================
// = actions =
// =============================================
const fetched = order => ({
  type: FETCHED,
  order,
});

const fetching = () => ({
  type: FETCHING,
});


export function fetchOrder(cid) {
  return (dispatch, getState) => {
    dispatch(fetching());
    asyncXhrAuthedPost(
      '/ajax/get_order.json',
      { cid },
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
  order: null,
};

export default (state = initialState, action) => {
  switch (action.type) {
    case FETCHING:
      return Object.assign({}, state, {
        isFetching: true,
      });

    case FETCHED:
      return Object.assign({}, state, {
        isFetching: false,
        order: action.order,
      });

    default:
      return state;
  }
};
