/* eslint-disable import/prefer-default-export */
import { asyncXhrAuthedPost } from 'lib/xhr';
import * as types from './actionTypes';

export const TYPE_OWNER = 'TYPE_OWNER';
export const TYPE_LESSEE = 'TYPE_LESSEE';

function fetched(comments, fetchType) {
  return (dispatch, getState) => {
    if (fetchType !== getState().fetchType) return;

    dispatch({
      type: types.FETCHED,
      comments,
    });
  };
}

const fetching = fetchType => ({
  type: types.FETCHING,
  fetchType,
});

const resetComments = () => ({
  type: types.RESET,
});


export function reset() {
  return (dispatch) => {
    dispatch(resetComments());
  };
}

function getCommentsPath(fetchType) {
  switch (fetchType) {
    case TYPE_OWNER:
      return '/ajax/get_owner_comments.json';
    case TYPE_LESSEE:
      return '/ajax/get_lessee_comments.json';
    default:
      throw new Error('wrong comment type');
  }
}

export function fetchComments(fetchType) {
  return (dispatch, getState) => {
    const { comment, auth } = getState();
    const {
      size,
      index,
    } = comment;

    dispatch(fetching(fetchType));

    asyncXhrAuthedPost(
      getCommentsPath(fetchType),
      {
        uid,
        index,
        size,
      },
      getState(),
    )
    .then((responseData) => {
      dispatch(
        fetched(
          responseData,
          fetchType,
        ),
      );
    });
  };
}
