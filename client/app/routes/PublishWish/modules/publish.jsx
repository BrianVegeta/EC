import constraints from 'constraints/publish';
import validate from 'validate.js';
import { isEmpty, parseInt } from 'lodash';
import { now } from 'lib/time';
import { findTopCategory } from 'lib/category';
import { asyncXhrPost, asyncXhrAuthedPost, asyncXhrPutImage } from 'lib/xhr';
import { asyncContainBlobTobase64, base64ToBlobData } from 'lib/utils';
import { REDUCER_KEY as AUTH_REDUCER_KEY } from 'modules/auth';
/* =============================================>>>>>
= settings =
===============================================>>>>>*/
const ACTION_PREFIX = 'PUBLISH.WISH';
export const REDUCER_KEY = 'publishWish';
const CATEGORY_REDUCER_KEY = 'categories';

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
}, topCategory) => {
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
    topCategory,
    catId: parseInt(cat_id),
  });
};

export const editPublish = id =>
  (dispatch, getState) => {
    asyncXhrPost(
      '/ajax/get_wish.json',
      {
        id,
        index: 0,
        size: 1,
      },
    ).then((data) => {
      const categories = getState()[CATEGORY_REDUCER_KEY];
      const topCategory = findTopCategory(parseInt(data.cat_id), categories);
      dispatch(fetchedForEdit(transformState(data, topCategory)));
    }).catch(error => console.log(error));
  };

const transformParams = ({
  id,
  picture,
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
    id,
    picture,
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
      asyncXhrAuthedPost(
        '/ajax/wish/save.json',
        transformParams(publish),
        getState(),
      ).then((data) => {
        resolve(data);
      }).catch(() => reject());
    });

export const uploadPhoto = blob =>
  (dispatch, getState) => {
    dispatch(changeData({ picturePlaceholder: blob }));

    const { currentUser: { uid } } = getState()[AUTH_REDUCER_KEY];
    asyncContainBlobTobase64(blob, true).then((base64) => {
      const formData = new FormData();
      formData.append('image', base64ToBlobData(base64));
      asyncXhrPutImage(
        `/ajax/images/wish/${uid}.json`,
        formData,
      ).then((url) => {
        dispatch(changeData({ picture: url }));
      });
    });
  };
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
        catId: null,
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
