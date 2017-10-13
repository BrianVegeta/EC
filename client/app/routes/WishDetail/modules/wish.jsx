import { now } from 'lib/time';
import { parseInt } from 'lodash';
import { asyncXhrPost } from 'lib/xhr';
/* =============================================>>>>>
= settings =
===============================================>>>>>*/
const ACTION_PREFIX = 'WISH.DETAIL';
export const REDUCER_KEY = 'wishDetail';

// =============================================
// = action type =
// =============================================
const prefix = action => (`${ACTION_PREFIX}.${action}`);

export const FETCHED = prefix('FETCHED');
export const RESET = prefix('RESET');


// =============================================
// = actions =
// =============================================
export const fetched = data => ({
  type: FETCHED,
  data,
});

export const reset = () => ({
  type: RESET,
});

/* transform fetched data to state */
const transformState = ({
  id,
  pname,
  description,
  city,
  area,
  expprice,
  expcurrency,
  expday,
  picture,
  cat_id,
  category_name,
  user_img,
  user_name,
  create_time,
  uid,
}) => ({
  id,
  pname,
  description,
  city,
  area,
  expprice,
  expcurrency,
  expday,
  picture,
  catId: cat_id,
  categoryName: category_name,
  userImg: user_img,
  userName: user_name,
  publishAt: create_time,
  uid,
});

export const fetchRecord = id =>
  (dispatch) => {
    asyncXhrPost(
      '/ajax/get_wish.json',
      {
        id,
      },
    ).then((data) => {
      dispatch(fetched(transformState(data)));
    }).catch(error => console.log(error));
  };


// =============================================
// = reducer =
// =============================================
const initialState = {
  id: 0,
  pname: '',
  description: '',
  city: '',
  area: '',
  expprice: 0,
  expcurrency: 'NTD',
  expday: 0,
  picture: '',
  catId: '',
  categoryName: '',
  userImg: '',
  userName: '',
  publishAt: null,
  uid: '',
};

export default (state = initialState, action) => {
  switch (action.type) {

    case FETCHED: {
      const newState = Object.assign({}, action.data, {
        fetchedAt: now(),
      });
      return Object.assign({}, state, newState);
    }

    case RESET:
      return initialState;

    default:
      return state;
  }
};
