import * as types from 'constants/actionTypes/accessCheck';
import { NEW, CHECK } from 'constants/renderTypes/accessCheck';

const initialState = {
  isChecking: false,
  renderType: CHECK,
  password: '',
};

const home = (state = initialState, action) => {
  switch (action.type) {
    case types.EXIST_CHECKING:
      return Object.assign({}, state, {
        isChecking: true,
      });

    case types.EXIST_CHECKED:
      return Object.assign({}, state, {
        isChecking: false,
        renderType: action.exist ? CHECK : NEW,
      });

    case types.CHANGE_STATE:
      return Object.assign({}, state, action.state);

    case types.CHECKING:
      return Object.assign({}, state, {
        isChecking: true,
      });

    case types.CHECKED:
      return Object.assign({}, state, {
        isChecking: false,
      });

    case types.RESET:
      return Object.assign({}, state, initialState);

    default:
      return state;
  }
};
export default home;
