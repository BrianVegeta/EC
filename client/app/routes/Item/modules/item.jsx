import { isEqual, find, parseInt } from 'lodash';
import { fromJS } from 'immutable';
import { asyncXhrPost, asyncXhrAuthedPost } from 'lib/xhr';
import { redirectToLogin } from 'lib/redirect';
import { fetchCollections } from 'modules/myCollection';
import { REDUCER_KEY as AUTH_REDUCER_KEY } from 'modules/auth';

/* =============================================>>>>>
= settings =
===============================================>>>>>*/
export const REDUCER_KEY = 'item';
const COLLECTION_KEY = 'myCollection';
const AUTH_KEY = 'auth';

/* =============================================>>>>>
= action types =
===============================================>>>>>*/

const prefix = action => (`ITEM.${action}`);
const SET_EDIT = prefix('SET_EDIT');
const CHANGE_OWNER = prefix('CHANGE_OWNER');
const SET_COLLECTION = prefix('SET_COLLECTION');
const RESET = prefix('RESET');

/* =============================================>>>>>
= actions =
===============================================>>>>>*/

const checkInFavorite = (detail, favorites) => {
  const inFavorites = find(favorites, { pid: parseInt(detail.pid) });
  return Object.assign({}, detail, {
    in_my_favorite: Boolean(inFavorites),
  });
};

const setEdit = detail => ({
  type: SET_EDIT,
  detail,
});

const changeOwner = userProfile => ({
  type: CHANGE_OWNER,
  userProfile,
});

export const reset = () => ({
  type: RESET,
});

//
// const fetched = () => ({
//   type: FETCHED,
// });

export const setCollection = isFavorite => ({
  type: SET_COLLECTION,
  isFavorite,
});

const fetchItem = pid =>
  dispatch =>
    new Promise((resolve) => {
      asyncXhrPost(
        '/ajax/item_detail.json', { pid },
      ).then((data) => {
        const { uid } = data;
        dispatch(setEdit(data));
        resolve(data);
        asyncXhrPost(
          '/ajax/user_info.json', { uid },
        ).then(({ user_profile }) => {
          dispatch(changeOwner(user_profile));
        });
      });
    });


export function editItem(pid) {
  return (dispatch, getState) => {
    const { isLogin } = getState()[AUTH_KEY];
    dispatch(
      fetchItem(pid),
    ).then((data) => {
      if (!isLogin) {
        dispatch(setEdit(
          checkInFavorite(data, []),
        ));
        return;
      }
      const { records: collection } = getState()[COLLECTION_KEY];
      if (collection.length > 0) {
        dispatch(setEdit(
          checkInFavorite(data, collection),
        ));
        return;
      }
      dispatch(
        fetchCollections(),
      ).then((newCollection) => {
        dispatch(setEdit(
          checkInFavorite(data, newCollection),
        ));
      });
    });
  };
}

export const checkItemOngoing = pid =>
  (dispatch, getState) => {
    const { isLogin } = getState()[AUTH_REDUCER_KEY];
    return new Promise((resolve, reject) => {
      if (!isLogin) {
        dispatch(redirectToLogin());
      } else {
        asyncXhrAuthedPost(
          '/ajax/check_item_ongoing.json', { pid }, getState(),
        ).then((data) => {
          if (data && data[0].contractstage === 1) {
            resolve();
          } else {
            reject();
          }
        });
      }
    });
  };

/* =============================================>>>>>
= reducers =
===============================================>>>>>*/
const initialState = {
  isFetched: false,
  ownerProfile: {},
  detail: {
    in_my_favorite: false,
  },
};

export const isStateInitial = props =>
  isEqual(props, initialState);

export default function (state = initialState, action) {
  switch (action.type) {

    case SET_EDIT:
      return fromJS(state).updateIn(
        ['detail'],
        detail => detail.merge(action.detail),
      ).toJS();

    case CHANGE_OWNER:
      return Object.assign({}, state, {
        isFetched: true,
        ownerProfile: action.userProfile,
      });

    case SET_COLLECTION: {
      const count = action.isFavorite ? state.detail.favorite_count + 1
        : state.detail.favorite_count - 1;
      const newDetail = Object.assign({}, state.detail, {
        in_my_favorite: action.isFavorite,
        favorite_count: count,
      });
      return Object.assign({}, state, {
        isFetched: true,
        detail: newDetail,
      });
    }

    case RESET: {
      return initialState;
    }

    default:
      return state;
  }
}
