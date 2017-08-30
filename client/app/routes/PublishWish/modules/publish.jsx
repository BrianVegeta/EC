import { asyncXhrPost, asyncXhrAuthedPost } from 'lib/xhr';
import validate from 'validate.js';
import { isEmpty } from 'lodash';
import { now } from 'lib/time';
import constraints from 'constraints/publish';

import { REDUCER_KEY as COVER_REDUCER_KEY } from './avatarCropper';
/* =============================================>>>>>
= settings =
===============================================>>>>>*/
const ACTION_PREFIX = 'PUBLISH.WISH';
export const REDUCER_KEY = 'publishWish';

// =============================================
// = action type =
// =============================================
const prefix = action => (`${ACTION_PREFIX}.${action}`);

export const CHANGE_DATA = prefix('CHANGE_DATA');
export const CHANGE_TOP_CAT = prefix('CHANGE_TOP_CAT');
export const FETCHED_FOR_EDIT = prefix('FETCHED_FOR_EDIT');
export const RESET = prefix('RESET');


// =============================================
// = actions =
// =============================================

export const changeData = data => ({
  type: CHANGE_DATA,
  data,
});

export const changeTopCategory = topCategory => ({
  type: CHANGE_TOP_CAT,
  topCategory,
});

export const fetchedForEdit = data => ({
  type: FETCHED_FOR_EDIT,
  data,
});

export const reset = () => ({
  type: RESET,
});

/* transform fetched data to state */
const transformState = ({
  id, pname, description, city, area, expprice,
  expcurrency, expday, picture, cat_id,
}) => {
  return ({
    picture,
    id,
    pname,
    description,
    city,
    area,
    expprice,
    expcurrency,
    expday,
    catId: cat_id
  });
};

export const editPublish = id =>
  (dispatch) => {
    asyncXhrPost(
      '/ajax/get_wish.json',
      { id },
    ).then((data) => {
      dispatch(fetchedForEdit(transformState(data)));
    }).catch(error => console.log(error));
  };

const transformParams = (covers, {
  id,
  pname,
  description,
  city,
  area,
  expprice,
  expcurrency,
  expday,
  catId,
}) => {
  return ({
    picture: covers[0] && covers[0].s3,
    id,
    pname,
    description,
    city,
    area,
    expprice,
    expcurrency,
    expday,
    cat_id: catId,
  });
};

export const validateWishBy = ({
  pname, description,
  city, area,
  expprice, catId,
}) => {
  const errors = validate({
    pname,
    description,
    cityArea: `${city}${area}`,
    category: catId,
    expprice,
  }, {
    pname: constraints.title,
    description: constraints.descript,
    cityArea: constraints.cityArea,
    expprice: constraints.price,
    category: constraints.category,

  });
  return {
    isValid: isEmpty(errors),
    errors,
  };
};

export const validateWish = () =>
  (dispatch, getState) =>
    new Promise((resolve, reject) => {
      const {
        pname,
        description,
        city,
        area,
        expprice,
        catId,
      } = getState()[REDUCER_KEY];
      const { isValid, errors } = validateWishBy({
        pname,
        description,
        city,
        area,
        expprice,
        catId,
      });
      if (isValid) {
        resolve();
      } else {
        reject(errors);
      }
    });

export const savePublish = () =>
  (dispatch, getState) =>
    new Promise((resolve, reject) => {
      const publish = getState()[REDUCER_KEY];
      const covers = getState()[COVER_REDUCER_KEY];
      asyncXhrAuthedPost(
        '/ajax/wish/save.json',
        transformParams(covers, publish),
        getState(),
      ).then((data) => {
        resolve(data);
      }).catch(() => reject());
    });

// =============================================
// = reducer =
// =============================================
const initialState = {
  id: null,
  pname: '',
  description: '',
  city: '',
  area: '',
  expprice: null,
  expcurrency: 'NTD',
  picture: '',
  expday: 1,
  topCategory: null,
  catId: null,
};

export default (state = initialState, action) => {
  switch (action.type) {
    case CHANGE_DATA:
      return Object.assign({}, state, action.data);

    case CHANGE_TOP_CAT: {
      return Object.assign({}, state, {
        topCategory: action.topCategory,
        catId: null
      });
    }
    case FETCHED_FOR_EDIT: {
      const newState = Object.assign({}, action.data, {
        fetchedAt: now(),
      });
      return Object.assign({}, state, newState);
    }

    case RESET:
      return initialState;

    default:
      return state;
  }
};
