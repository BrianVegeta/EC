import { connect } from 'react-redux';
import { includes } from 'lodash';

import { reservationService as rsRouter } from 'lib/paths';

import {
  checkReadyAndSet,
  reset as resetBankInfo,
} from 'modules/personalBankInfo';
import {
  fetchItem,
  reset as resetItem,
} from '../modules/reservationItem';
import Component from '../components/ReservationService';
import {
  validateFormBy,
  validatePaymentBy,
} from '../modules/validation';
// import { reset as resetCovers } from '../modules/covers';
// import { reset as resetCropper } from '../modules/cropper';
// import { reset as resetPublish } from '../modules/publish';

const mapPathsTouched = (steps, touchedStepPaths) =>
  steps.map(step => ({
    isTouched: includes(touchedStepPaths, step.path),
    ...step,
  }));

/* pick props */
const mapStateToProps = ({
  environment,
  reservationCoupons,
  reservationService,
  reservationServiceItem,
  personalBankInfo,
}, { params }) => {
  const { touchedStepPaths } = reservationService;
  const { pid } = params;
  const isFetched = Boolean(reservationCoupons.updatedAt && reservationServiceItem.owner);

  const steps = [
    {
      text: '填寫預訂資訊',
      path: rsRouter.formPath(pid),
      isValid: isFetched ? validateFormBy(
        reservationService,
        reservationServiceItem,
      ).isValid : false,
    },
    {
      text: '支付方式',
      path: rsRouter.paymentPath(pid),
      isValid: validatePaymentBy(
        reservationService,
        personalBankInfo.isReady,
      ).isValid,
    },
    {
      text: '確認預訂資訊',
      path: rsRouter.confirmPath(pid),
      isValid: false,
    },
  ];

  return ({
    environment,
    reservation: reservationService,
    steps: mapPathsTouched(steps, touchedStepPaths),
  });
};

/* pick dispatch */
const mapDispatchToProps = (dispatch, { params }) => ({
  dispatchFetchItem: () => dispatch(fetchItem(params.pid)),
  dispatchReset: () => dispatch(resetItem()),
  dispatchCheckBankInfoReady: () => dispatch(checkReadyAndSet()),
  dispatchResetBankInfo: () => dispatch(resetBankInfo()),
});

export default connect(mapStateToProps, mapDispatchToProps)(Component);
