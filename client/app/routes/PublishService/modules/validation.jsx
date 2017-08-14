/* eslint-disable import/prefer-default-export */
// import { asyncXhrPost } from 'lib/xhr';
import validate from 'validate.js';
import {
  isEmpty,
  filter,
} from 'lodash';

import { formatCurrency } from 'lib/currency';
import constraints, {
  PRICE_MAX,
} from 'constraints/publish';

import {
  REDUCER_KEY as PUBLISH_REDUCER_KEY,
  CHARGE_TYPE_FIX,
} from './publish';
import { REDUCER_KEY as COVERS_REDUCER_KEY } from './covers';

/* =============================================>>>>>
= settings =
===============================================>>>>>*/
// const ACTION_PREFIX = 'PUBLISH.VALIDATION';


// =============================================
// = action type =
// =============================================
// const prefix = action => (`${ACTION_PREFIX}.${action}`);


// =============================================
// = actions =
// =============================================

/* COVERS */
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

/* ABOUT */
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

/* DELIVERY */
export const validateDeliveryBy = ({
  assignAddressByCustomer,
  assignAddressByOwner,
  assignCity,
  assignArea,
  assignAddress,
}) => {
  if (!assignAddressByOwner) {
    return {
      isValid: assignAddressByCustomer,
      errors: { optionError: '至少選擇一個選項' },
    };
  }

  const errors = validate({
    assignCityArea: `${assignCity}${assignArea}`,
    assignAddress,
  }, {
    assignCityArea: constraints.cityArea,
    assignAddress: constraints.address,
  });

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

/* PRICE */
export const validatePriceBy = ({
  chargeType,
  price,
  deposit,
  startDate, endDate,
  unit,
  reservationDays,
  discount,
}) => {
  if (!chargeType) {
    return {
      isValid: false,
      errors: { chargeTypeError: '請選擇一種計費方式' },
    };
  }

  const priceNumber = parseInt(price, 10) || 0;
  const depositNumber = parseInt(deposit, 10) || 0;
  if ((priceNumber + depositNumber) > PRICE_MAX) {
    return {
      isValid: false,
      errors: { totalError: `總計不得超過 ${formatCurrency(PRICE_MAX)}` },
    };
  }

  const serviceDatesValidation = chargeType === CHARGE_TYPE_FIX ?
    constraints.serviceDates : null;

  const serviceUnitValidation = chargeType === CHARGE_TYPE_FIX ?
    constraints.serviceUnit : null;

  const serviceReservationDaysValidation = chargeType === CHARGE_TYPE_FIX ?
    null : constraints.serviceReservationDays;

  const errors = validate({
    price,
    deposit,
    serviceDates: startDate && endDate && 'date',
    unit,
    reservationDays,
    discount,
  }, {
    price: constraints.price,
    deposit: constraints.deposit,
    serviceDates: serviceDatesValidation,
    unit: serviceUnitValidation,
    reservationDays: serviceReservationDaysValidation,
    discount: constraints.discount,
  });

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

/* REGULATION */
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

// =============================================
// = reducer =
// =============================================
// export const initialState = {
// };
// export default (state = initialState, action) => {
//   switch (action.type) {
//     default:
//       return state;
//   }
// };
