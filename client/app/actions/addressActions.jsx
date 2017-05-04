/* eslint-disable import/prefer-default-export */
import _ from 'lodash';
import { GET } from './methods';
import * as TYPES from '../constants/actionTypes';

const setCities = cities => ({
  type: TYPES.ADDRESS_SET_CITIES,
  cities,
});

const setCityZones = (cityName, zones) => ({
  type: TYPES.ADDRESS_SET_ZONES,
  cityName,
  zones,
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

export function fetchZones(cityName) {
  return (dispatch, getState) => {
    const { routesHelper, cities } = getState();
    const city = _.find(cities, { city: cityName });
    if (_.isEmpty(city.zones) === false) return;

    fetch(routesHelper.ajax.cityZones.replace('qCity', cityName), GET)
    .then(response => response.json())
    .then(zones => dispatch(setCityZones(cityName, zones)))
    .catch((err) => { throw err; });
  };
}
