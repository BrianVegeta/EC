import { fetchCategories } from '../../actions/itemsActions';

// step 1 index
const getCoverComponent = () => ({
  getComponent(_nextState, callback) {
    require.ensure([], (require) => {
      const formComponent = require('./Step1Cover/Container').default;
      callback(null, { formComponent });
    });
  },
});
// step 2
const getAboutComponent = (dispatch, path) => ({
  path,
  getComponent(_nextState, callback) {
    require.ensure([], (require) => {
      const formComponent = require('./Step2About/Container').default;
      callback(null, { formComponent });
    });
  },
  onEnter: () => {
    dispatch(fetchCategories());
  },
});
// step3
const getDeliveryComponent = path => ({
  path,
  getComponent(_nextState, callback) {
    require.ensure([], (require) => {
      const formComponent = require('./Step3Delivery/Container').default;
      callback(null, { formComponent });
    });
  },
});
// step4
const getPriceComponent = path => ({
  path,
  getComponent(_nextState, callback) {
    require.ensure([], (require) => {
      const formComponent = require('./Step4Price/Container').default;
      callback(null, { formComponent });
    });
  },
});
// step5
const getRegulationComponent = path => ({
  path,
  getComponent(_nextState, callback) {
    require.ensure([], (require) => {
      const formComponent = require('./Step5Regulation/Container').default;
      callback(null, { formComponent });
    });
  },
});
// step6
const getCancelPolicyComponent = path => ({
  path,
  getComponent(_nextState, callback) {
    require.ensure([], (require) => {
      const formComponent = require('./Step6CancelPolicy/Container').default;
      callback(null, { formComponent });
    });
  },
});
// step7
const getConfirmComponent = path => ({
  path,
  getComponent(_nextState, callback) {
    require.ensure([], (require) => {
      const formComponent = require('./Step7Confirm/Container').default;
      callback(null, { formComponent });
    });
  },
});
module.exports = {
  getAboutComponent,
  getCoverComponent,
  getDeliveryComponent,
  getPriceComponent,
  getRegulationComponent,
  getCancelPolicyComponent,
  getConfirmComponent
};
