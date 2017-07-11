import * as types from 'constants/actionTypes/item';
import _ from 'lodash';

const initialState = {
  ownerProfile: {},
};

export const isStateInitial = props =>
  _.isEqual(props, initialState);

export default function (state = initialState, action) {
  switch (action.type) {

    case types.SET_EDIT:
      return Object.assign({}, state, action.detail);

    case types.CHANGE_OWNER:
      return Object.assign({}, state, {
        ownerProfile: action.userProfile,
      });

    default:
      return state;
  }
}
