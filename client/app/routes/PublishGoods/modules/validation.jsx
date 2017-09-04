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
  categoryID,
  tag1, tag2, tag3,
}) => {
  const errors = validate({
    title,
    descript,
    cityArea: `${cityName}${areaName}`,
    category: categoryID,
    tag1,
    tag2,
    tag3,
  }, {
    title: constraints.title,
    descript: constraints.descript,
    cityArea: constraints.cityArea,
    category: constraints.category,
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
        tag1, tag2, tag3,
      } = getState()[PUBLISH_REDUCER_KEY];

      const { isValid, errors } = validateAboutBy({
        title,
        descript,
        cityName,
        areaName,
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
  returnCity,
  returnArea,
  returnAddress,
  sendBy711,
  sendByOtherShippment,
  sendByInPerson,
  returnBy711,
  returnByOtherShippment,
  returnByInPerson,
}) => {
  let errors = '';
  if (!(sendBy711 || sendByOtherShippment || sendByInPerson)) {
    return {
      isValid: false,
      errors: { optionError: '至少選擇一個出貨選項' },
    };
  }

  if (!(returnBy711 || returnByOtherShippment || returnByInPerson)) {
    return {
      isValid: false,
      errors: { optionError: '至少選擇一個還貨選項' },
    };
  }

  if (returnByOtherShippment) {
    errors = validate({
      cityArea: `${returnCity}${returnArea}`,
      returnAddress,
    }, {
      cityArea: constraints.cityArea,
      returnAddress: constraints.address,
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
= Price =
===============================================>>>>>*/
export const validatePriceBy = ({
  price,
  deposit,
  unit,
  minimumShippemntDay,
  discounts,
}) => {
  const priceNumber = parseInt(price, 10) || 0;
  const depositNumber = parseInt(deposit, 10) || 0;
  if ((priceNumber + depositNumber) > PRICE_MAX) {
    return {
      isValid: false,
      errors: { totalError: `總計不得超過 ${formatCurrency(PRICE_MAX)}` },
    };
  }

  let errors = validate({
    price,
    deposit,
    unit,
    minimumShippemntDay,
  }, {
    price: constraints.price,
    deposit: constraints.deposit,
    unit: constraints.goodsUnit,
    minimumShippemntDay: constraints.minimumShippemntDay,
  });
  if (!(errors)) {
    discounts.forEach((discount) => {
      const param = discount.param;
      const val = discount.discount;
      const tError = validate({
        param,
        val,
      }, {
        param: constraints.discountParam,
        val: constraints.discountVal(priceNumber),
      });
      if (isEmpty(errors)) {
        errors = tError;
      }
    });
  }
  return {
    isValid: isEmpty(errors),
    errors,
  };
};

export const validatePrice = () =>
  (dispatch, getState) =>
    new Promise((resolve, reject) => {
      const publish = getState()[PUBLISH_REDUCER_KEY];
      const { isValid, errors } = validatePriceBy(publish);

      if (isValid) {
        resolve();
      } else {
        reject(errors);
      }
    });

/* =============================================>>>>>
= Regulation =
===============================================>>>>>*/
export const validateRegulationBy = ({ regulation }) => {
  const errors = validate({
    regulation,
  }, {
    regulation: constraints.regulation,
  });

  return {
    isValid: isEmpty(errors),
    errors,
  };
};

export const validateRegulation = () =>
  (dispatch, getState) =>
    new Promise((resolve, reject) => {
      const publish = getState()[PUBLISH_REDUCER_KEY];
      const { isValid, errors } = validateRegulationBy(publish);

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
  const { isValid: isPriceValid } = validatePriceBy(publish);
  const { isValid: isRegulationValid } = validateRegulationBy(publish);
  return (
    isCoversValid &&
    isAboutValid &&
    isDeliveryValid &&
    isPriceValid &&
    isRegulationValid
  );
};

export const validateAll = () =>
  dispatch =>
    new Promise((resolve, reject) => {
      const promises = [
        dispatch(validateCovers()),
        dispatch(validateAbout()),
        dispatch(validateDelivery()),
        dispatch(validatePrice()),
        dispatch(validateRegulation()),
      ];

      Promise.all(promises)
      .then(results => resolve(results))
      .catch(errors => reject(errors));
    });
