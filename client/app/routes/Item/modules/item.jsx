import { isEqual } from 'lodash';
import { asyncXhrPost } from 'lib/xhr';

/* =============================================>>>>>
= settings =
===============================================>>>>>*/
export const REDUCER_KEY = 'item';

/* =============================================>>>>>
= action types =
===============================================>>>>>*/

const prefix = action => (`ITEM.${action}`);
const SET_EDIT = prefix('SET_EDIT');
const CHANGE_OWNER = prefix('CHANGE_OWNER');
const FETCHED = prefix('FETCHED');

/* =============================================>>>>>
= actions =
===============================================>>>>>*/

const setEdit = detail => ({
  type: SET_EDIT,
  detail,
});

const changeOwner = userProfile => ({
  type: CHANGE_OWNER,
  userProfile,
});

const fetched = () => ({
  type: FETCHED,
});


export function editItem(pid) {
  return (dispatch) => {
    asyncXhrPost(
      '/ajax/item_detail.json',
      { pid },
    ).then((data) => {
      dispatch(setEdit(data));
      const { uid } = data;
      asyncXhrPost(
        '/ajax/user_info.json',
        { uid },
      ).then(({ user_profile }) => {
        dispatch(changeOwner(user_profile));
        dispatch(fetched());
      });
    });
  };
}


/* =============================================>>>>>
= reducers =
===============================================>>>>>*/
const initialState = {
  isFetched: false,
  ownerProfile: {},
  detail: {},
};

export const isStateInitial = props =>
  isEqual(props, initialState);

export default function (state = initialState, action) {
  switch (action.type) {

    case SET_EDIT:
      return Object.assign({}, state, {
        detail: action.detail,
      });

    case CHANGE_OWNER:
      return Object.assign({}, state, {
        ownerProfile: action.userProfile,
      });

    case FETCHED:
      return Object.assign({}, state, {
        isFetched: true,
      });

    default:
      return state;
  }
}
