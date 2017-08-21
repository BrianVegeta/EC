/* eslint-disable import/prefer-default-export */
/* eslint-disable camelcase */
import validate from 'validate.js';
import {
  isEmpty,
} from 'lodash';
import constraints from 'constraints/reservation';
import {
  REDUCER_KEY as RESERVATION_REDUCER_KEY,
  PAYMENT_TYPE_ATM,
  PAYMENT_TYPE_CREDIT_CARD,
} from './reservation';
import {
  REDUCER_KEY as RESERVATION_ITEM_REDUCER_KEY,
  // CHARGE_TYPE_FIX,
  // CHARGE_TYPE_DAY,
  CHARGE_TYPE_COUNT,
  // ASSIGN_ADDRESS_BY_OWNER,
  ASSIGN_ADDRESS_BY_CUSTOMER,
} from './reservationItem';


/* =============================================>>>>>
= Validate Form =
===============================================>>>>>*/
export const validateFormBy = ({
  leasestart, leaseend,
  serviceLocationType,
  serviceCity, serviceArea, serviceAddress,
  note, unit,
}, {
  calculate_charge_type,
  assign_address_type,
  unit: itemUnit,
}) => {
  const isCustomerAssign = serviceLocationType === ASSIGN_ADDRESS_BY_CUSTOMER;
  const isServiceLocationSelectable = assign_address_type.length > 1;

  const serviceCityAreaValidation = isCustomerAssign ? constraints.cityArea : null;
  const serviceAddressValidation = isCustomerAssign ? constraints.address : null;
  const serviceLocationTypeValidation = isServiceLocationSelectable ?
    constraints.serviceLocationType : null;

  const isCountChargeType = (calculate_charge_type === CHARGE_TYPE_COUNT);
  const unitValidation = isCountChargeType ? constraints.unit(itemUnit) : null;

  const errors = validate({
    dates: leasestart && leaseend && 'date',
    serviceLocationType,
    serviceCityArea: `${serviceCity}${serviceArea}`,
    serviceAddress,
    note,
    unit,
  }, {
    dates: constraints.dates,
    serviceLocationType: serviceLocationTypeValidation,
    serviceCityArea: serviceCityAreaValidation,
    serviceAddress: serviceAddressValidation,
    unit: unitValidation,
  });

  return {
    isValid: isEmpty(errors),
    errors,
  };
};

export const validateForm = () =>
  (dispatch, getState) =>
    new Promise((resolve, reject) => {
      const item = getState()[RESERVATION_ITEM_REDUCER_KEY];
      const reservation = getState()[RESERVATION_REDUCER_KEY];

      const { isValid, errors } = validateFormBy(reservation, item);
      if (isValid) {
        resolve();
      } else {
        reject(errors);
      }
    });

export const validatePaymentBy = ({ paymenttype }, isBankInfoReady) => {
  if (![PAYMENT_TYPE_ATM, PAYMENT_TYPE_CREDIT_CARD].includes(paymenttype)) {
    return {
      isValid: false,
      errors: { paymenttype: '請選擇付款方式' },
    };
  }
  if (PAYMENT_TYPE_ATM === paymenttype && !isBankInfoReady) {
    return {
      isValid: false,
      errors: { atm: '請設定銀行帳戶' },
    };
  }
  return { isValid: true, errors: {} };
};

export const validatePayment = () =>
  (dispatch, getState) =>
    new Promise((resolve, reject) => {
      const reservation = getState()[RESERVATION_REDUCER_KEY];
      const { personalBankInfo } = getState();
      const { isValid, errors } = validatePaymentBy(
        reservation,
        personalBankInfo.isReady,
      );
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
  const isCoversValid = validateCoversBy(covers).isValid;
  const isAboutValid = validateAboutBy(publish).isValid;
  const isDeliveryValid = validateDeliveryBy(publish).isValid;
  const isPriceValid = validatePriceBy(publish).isValid;
  const isRegulationValid = validateRegulationBy(publish).isValid;
  return isCoversValid
    && isAboutValid
    && isDeliveryValid
    && isPriceValid
    && isRegulationValid;
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
