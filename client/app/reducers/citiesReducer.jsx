import _ from 'lodash';
import * as TYPES from '../constants/actionTypes';

const initialState = [];
// ex: { city: '台北市', zones: [ '士林區', '大安區', ... ] }
export default (state = initialState, action) => {
  switch (action.type) {
    case TYPES.ADDRESS_SET_CITIES: {
      const { cities } = action;
      return _.clone(cities.map(city => ({ city, zones: [] })));
    }
    case TYPES.ADDRESS_SET_ZONES: {
      const cities = _.clone(state);
      const { cityName, zones } = action;
      const index = _.findIndex(cities, { city: cityName });
      cities[index] = Object.assign({}, cities[index], { zones });
      return cities;
    }
    default:
      return state;
  }
};
