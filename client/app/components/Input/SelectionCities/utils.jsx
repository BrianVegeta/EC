/* eslint-disable import/prefer-default-export */
import {
  isEmpty,
  find,
} from 'lodash';

export const collectCities = (dispatchFetchAreas, cities) =>
  cities.map(city =>
    Object.assign({}, city, {
      areas: isEmpty(city.areas) ? () => dispatchFetchAreas(city.cityName) : city.areas,
    }),
  );

export const findAreas = (cityName, citiesCollection) =>
  find(citiesCollection, { cityName }).areas;
