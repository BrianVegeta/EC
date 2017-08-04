/* eslint-disable import/prefer-default-export */
import { asyncXhrAuthedPost } from 'lib/xhr';
import * as types from './actionTypes';

const fetched = collections => ({
    type: types.FETCHED,
    collections,
});

const fetching = () => ({
    type: types.FETCHING,
});

export function fetchCollections() {
  return (dispatch, getState) => {
    dispatch(fetching());
    asyncXhrAuthedPost(
            '/ajax/get_fav.json',
            {},
            getState(),
    )
    .then((responseData) => {
        dispatch(fetched(responseData));
    });
  };
}

