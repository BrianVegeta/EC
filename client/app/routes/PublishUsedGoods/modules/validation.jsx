/* eslint-disable import/prefer-default-export */
import validate from 'validate.js';
import { isEmpty, filter } from 'lodash';
import { formatCurrency } from 'lib/currency';
import constraints, { PRICE_MAX } from 'constraints/publish';
import {
  REDUCER_KEY as PUBLISH_REDUCER_KEY,
} from './publish';
import { REDUCER_KEY as COVERS_REDUCER_KEY } from './covers';


/* =============================================>>>>>
= Validate About =
===============================================>>>>>*/
export const validateCoversBy = (covers) => {
  const storedCount = filter(covers, { isStored: true }).length;
  const isValid = storedCount > 0;

  return {
    isValid,
    errors: [covers.length, storedCount],
  };
};

export const validateCovers = () =>
  (dispatch, getState) =>
    new Promise((resolve, reject) => {
      const covers = getState()[COVERS_REDUCER_KEY];
      const { isValid, errors } = validateCoversBy(covers);
      if (isValid) {
        resolve();
      } else {
        reject(errors);
      }
    });

/* =============================================>>>>>
= Validate About =
===============================================>>>>>*/
export const validateAboutBy = ({
  title, descript,
  cityName, areaName,
  price, unit,
  categoryID,
  tag1, tag2, tag3,
}) => {
  const errors = validate({
    title,
    descript,
    cityArea: `${cityName}${areaName}`,
    category: categoryID,
    price,
    unit,
    tag1,
    tag2,
    tag3,
  }, {
    title: constraints.title,
    descript: constraints.descript,
    cityArea: constraints.cityArea,
    category: constraints.category,
    price: constraints.price,
    unit: constraints.goodsUnit,
    tag1: constraints.tag,
    tag2: constraints.tag,
    tag3: constraints.tag,
  });
  return {
    isValid: isEmpty(errors),
    errors,
  };
};


export const validateAbout = () =>
  (dispatch, getState) =>
    new Promise((resolve, reject) => {
      const {
        title,
        descript,
        cityName, areaName,
        categoryID,
        price,
        unit,
        tag1, tag2, tag3,
      } = getState()[PUBLISH_REDUCER_KEY];
      const priceNumber = parseInt(price, 10) || 0;
      if ((priceNumber) > PRICE_MAX) {
        return {
          isValid: false,
          errors: { totalError: `總計不得超過 ${formatCurrency(PRICE_MAX)}` },
        };
      }

      const { isValid, errors } = validateAboutBy({
        title,
        descript,
        cityName,
        areaName,
        price,
        unit,
        categoryID,
        tag1,
        tag2,
        tag3,
      });
      if (isValid) {
        resolve();
      } else {
        reject(errors);
      }
    });

/* =============================================>>>>>
= Validate Delivery =
===============================================>>>>>*/
export const validateDeliveryBy = ({
  sendBy711,
  sendByOtherShippment,
  sendByInPerson,
  storeid,
}) => {
  let errors = '';
  if (!(sendBy711 || sendByOtherShippment || sendByInPerson)) {
    return {
      isValid: false,
      errors: { optionError: '至少選擇一個出貨選項' },
    };
  }

  if (sendBy711) {
    errors = validate({
      storeid,
    }, {
      storeid: constraints.storeid,
    });
  }

  return {
    isValid: isEmpty(errors),
    errors,
  };
};

export const validateDelivery = () =>
  (dispatch, getState) =>
    new Promise((resolve, reject) => {
      const publish = getState()[PUBLISH_REDUCER_KEY];
      const { isValid, errors } = validateDeliveryBy(publish);

      if (isValid) {
        resolve();
      } else {
        reject(errors);
      }
    });


/* =============================================>>>>>
= Validate all =
===============================================>>>>>*/
export const validateAllBy = (publish, covers) => {
  const { isValid: isCoversValid } = validateCoversBy(covers);
  const { isValid: isAboutValid } = validateAboutBy(publish);
  const { isValid: isDeliveryValid } = validateDeliveryBy(publish);
  return (
    isCoversValid &&
    isAboutValid &&
    isDeliveryValid
  );
};

export const validateAll = () =>
  dispatch =>
    new Promise((resolve, reject) => {
      const promises = [
        dispatch(validateCovers()),
        dispatch(validateAbout()),
        dispatch(validateDelivery()),
      ];

      Promise.all(promises)
      .then(results => resolve(results))
      .catch(errors => reject(errors));
    });
