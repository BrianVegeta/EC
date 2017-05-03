/* eslint-disable import/prefer-default-export */
import { GET } from './methods';
import * as TYPES from '../constants/actionTypes';

const setCities = cities => ({
  type: TYPES.ADDRESS_SET_CITIES,
  cities,
});

export function fetchCities() {
  return (dispatch, getState) => {
    const { routesHelper } = getState();
    fetch(routesHelper.ajax.cities, GET)
    .then(response => response.json())
    .then((json) => {
      dispatch(setCities(json));
    })
    .catch((err) => { throw err; });
  };
}
