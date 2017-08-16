import { connect } from 'react-redux';
import { includes } from 'lodash';

import { reservationService as rsRouter } from 'lib/paths';

// import { fetchCategories } from 'modules/categories';
import Component from '../components/ReservationService';
import {
  fetchItem,
  reset as resetItem,
} from '../modules/reservationItem';
// import {
//   validateAboutBy,
//   validateCoversBy,
//   validateDeliveryBy,
//   validatePriceBy,
//   validateRegulationBy,
// } from '../modules/validation';
// import { reset as resetCovers } from '../modules/covers';
// import { reset as resetCropper } from '../modules/cropper';
// import { reset as resetPublish } from '../modules/publish';

const mapPathsTouched = (steps, touchedStepPaths) =>
  steps.map(step => ({
    isTouched: includes(touchedStepPaths, step.path),
    ...step,
  }));

/* pick props */
const mapStateToProps = ({ environment, reservationService }, { params }) => {
  const { touchedStepPaths } = reservationService;
  const { pid } = params;
  const steps = [
    {
      text: '填寫預訂資訊',
      path: rsRouter.formPath(pid),
      isValid: true,
    },
    {
      text: '支付方式',
      path: rsRouter.paymentPath(pid),
      isValid: true,
    },
    {
      text: '確認預訂資訊',
      path: rsRouter.confirmPath(pid),
      isValid: true,
    },
  ];

  return ({
    environment,
    reservation: reservationService,
    steps: mapPathsTouched(steps, touchedStepPaths),
    // isCoversValid: validateCoversBy(covers).isValid,
    // isAboutValid: validateAboutBy(publish).isValid,
    // isDeliveryValid: validateDeliveryBy(publish).isValid,
    // isPriceValid: validatePriceBy(publish).isValid,
    // isRegulationValid: validateRegulationBy(publish).isValid,
  });
};

/* pick dispatch */
const mapDispatchToProps = (dispatch, { params }) => ({
  dispatchFetchItem: () => dispatch(fetchItem(params.pid)),
  dispatchReset: () => {
    dispatch(resetItem());
  },
  // dispatchFetchCategories: () => dispatch(fetchCategories()),
  // dispatchFetchCities: () => dispatch(fetchCities()),
});

export default connect(mapStateToProps, mapDispatchToProps)(Component);
