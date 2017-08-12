import { fromJS } from 'immutable';
import { asyncXhrGet, asyncXhrPost } from 'lib/xhr';

/* =============================================>>>>>
= settings =
===============================================>>>>>*/
const ACTION_PREFIX = 'CITIES';


// =============================================
// = action type =
// =============================================
const prefix = action => (`${ACTION_PREFIX}.${action}`);
const SET_CITIES = prefix('SET_CITIES');
const UPDATE_AREAS = prefix('UPDATE_AREAS');

// =============================================
// = actions =
// =============================================

const setCities = cities => ({
  type: SET_CITIES,
  cities,
});

const updateAreas = (cityName, areas) => ({
  type: UPDATE_AREAS,
  cityName,
  areas,
});

export const fetchCities = () =>
  (dispatch) => {
    asyncXhrGet('/ajax/cities.json')
    .then(data => dispatch(setCities(data)));
  };

export const fetchAreas = cityName =>
  (dispatch) => {
    asyncXhrPost(
      '/ajax/city_areas.json',
      { city_name: cityName },
    )
    .then(data => dispatch(updateAreas(cityName, data)));
  };


// =============================================
// = reducer =
// =============================================
/**
 *
 * initialState
 * [
 *    { cityName: '台北市', areas: [ '士林區', '大安區', ... ] },
 *    {},
 *    {},
 * ]
 *
 *
 */
export const initialState = [];
export default (state = initialState, action) => {
  switch (action.type) {
    case SET_CITIES:
      return action.cities.map(cityName =>
        ({ cityName }),
      );

    case UPDATE_AREAS: {
      const index = fromJS(state).findIndex(city =>
        city.get('cityName') === action.cityName,
      );
      return fromJS(state).updateIn(
        [index],
        city => city.set(
          'areas',
          action.areas.map(area => area.area),
        ),
      ).toJS();
    }

    default:
      return state;
  }
};
