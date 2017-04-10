/* eslint-disable import/prefer-default-export */
import * as TYPES from '../constants/actionTypes';

export const changeResolution = (width, height) => ({
  type: TYPES.CHANGE_RESOLUTION,
  width,
  height,
});

export const checkItemsLayoutFixed = fixed => ({
  type: TYPES.ENVIRONMENT_CHECK_ITEMS_LAYOUT_FIXED,
  fixed,
});

export const initEnvironment = () => (
  (dispatch) => {
    dispatch(changeResolution(window.innerWidth, window.innerHeight));
    window.onresize = () => {
      dispatch(changeResolution(window.innerWidth, window.innerHeight));
    };
  }
);
