/* eslint-disable import/prefer-default-export */
import * as TYPES from '../constants/actionTypes';

export const changeResolution = (width, height) => ({
  type: TYPES.CHANGE_RESOLUTION,
  width,
  height,
});
export const changeScrollTop = scrollTop => ({
  type: TYPES.ENVIRONMENT_CHANGE_SCROLLTOP,
  scrollTop,
});
export const checkItemsLayoutFixed = fixed => ({
  type: TYPES.ENVIRONMENT_CHECK_ITEMS_LAYOUT_FIXED,
  fixed,
});

const calculateItemLayout = (scrollTop, dispatch, prevState) => {
  if (scrollTop < 330 && prevState.environment.itemsLayoutFixed === true) {
    dispatch(checkItemsLayoutFixed(false));
  }
  if (scrollTop > 330 && prevState.environment.itemsLayoutFixed === false) {
    dispatch(checkItemsLayoutFixed(true));
  }
};

export const initEnvironment = () => (
  (dispatch, getState) => {
    dispatch(changeResolution(window.innerWidth, window.innerHeight));
    window.onresize = () => {
      dispatch(changeResolution(window.innerWidth, window.innerHeight));
    };

    // dispatch(changeScrollTop(document.documentElement.scrollTop || document.body.scrollTop));
    calculateItemLayout(
      document.documentElement.scrollTop || document.body.scrollTop,
      dispatch,
      getState(),
    );
    window.onscroll = () => {
      calculateItemLayout(
        document.documentElement.scrollTop || document.body.scrollTop,
        dispatch,
        getState(),
      );
      // dispatch(changeScrollTop(document.documentElement.scrollTop || document.body.scrollTop));
    };
  }
);
