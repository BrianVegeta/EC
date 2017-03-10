/* eslint-disable import/prefer-default-export */
import { CHANGE_RESOLUTION } from '../constants/actionTypes';

export const changeResolution = (width, height) => ({
  type: CHANGE_RESOLUTION,
  width,
  height,
});

export const initEnviroment = () => (
  (dispatch) => {
    dispatch(changeResolution(window.innerWidth, window.innerHeight));

    window.onresize = () => {
      dispatch(changeResolution(window.innerWidth, window.innerHeight));
    };
  }
);
