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

const ERROR_PAYMENT_TYPE = '請選擇付款方式。';
const ERROR_BANK_INFO_READY = '請設定銀行帳戶。';
const ERROR_AGREE = '請確認以上資訊並勾選。';


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

/* =============================================>>>>>
= Validate payment =
===============================================>>>>>*/
export const validatePaymentBy = ({ paymenttype }, isBankInfoReady) => {
  if (![PAYMENT_TYPE_ATM, PAYMENT_TYPE_CREDIT_CARD].includes(paymenttype)) {
    return {
      isValid: false,
      errors: { paymenttype: ERROR_PAYMENT_TYPE },
    };
  }
  if (PAYMENT_TYPE_ATM === paymenttype && !isBankInfoReady) {
    return {
      isValid: false,
      errors: { atm: ERROR_BANK_INFO_READY },
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
= Validate agree  =
===============================================>>>>>*/
export const validateAgreeBy = ({ isAgree }) => ({
  isValid: isAgree,
  errors: isAgree ? {} : { agree: ERROR_AGREE },
});

export const validateAgree = () =>
  (dispatch, getState) =>
    new Promise((resolve, reject) => {
      const reservation = getState()[RESERVATION_REDUCER_KEY];
      const { isValid, errors } = validateAgreeBy(reservation);

      if (isValid) {
        resolve();
      } else {
        reject(errors);
      }
    });


/* =============================================>>>>>
= Validate all =
===============================================>>>>>*/
export const validateAllBy = (reservation, item, isBankInfoReady) => {
  const isFormValid = validateFormBy(reservation, item).isValid;
  const isPaymentValid = validatePaymentBy(reservation, isBankInfoReady);
  const isAgreeValid = validateAgreeBy(reservation);

  return isFormValid && isPaymentValid && isAgreeValid;
};

export const validateAll = () =>
  dispatch =>
    new Promise((resolve, reject) => {
      const promises = [
        dispatch(validateForm()),
        dispatch(validatePayment()),
        dispatch(validateAgree()),
      ];

      Promise.all(promises)
      .then(results => resolve(results))
      .catch(errors => reject(errors));
    });
