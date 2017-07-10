import { fetchCategories } from '../../../actions/itemsActions';
import { confirmLeavePage } from '../../../funcs/confirm';
import { checkStepRestart } from '../../../actions/routerAction';
import { PATH } from '../../Release/constants';


export default (routesHelper, dispatch) => ({
  path: '/p/release-space',
  getComponent(_nextState, callback) {
    require.ensure([], (require) => {
      callback(null, {
        main: require('./Container').default,
      });
    }, 'release.space');
  },
  indexRoute: {
    getComponent(_nextState, callback) {
      require.ensure([], (require) => {
        callback(null, { formComponent: require('./Step1_Cover/Container').default });
      }, 'r-sp-1');
    },
  },
  onEnter: () => {
    // dispatch(checkStepRestart(PATH.STEP_1_COVER_INDEX));
    window.addEventListener('beforeunload', confirmLeavePage);
  },
  childRoutes: [
    {
      path: 's2_a',
      getComponent(_nextState, callback) {
        require.ensure([], (require) => {
          callback(null, { formComponent: require('./Step2_About/Container').default });
        }, 'r-sp-2');
      },
      onEnter: () => dispatch(fetchCategories()),
    },
    {
      path: 's3_d',
      getComponent(_nextState, callback) {
        require.ensure([], (require) => {
          callback(null, { formComponent: require('./Step3_Delivery/Container').default });
        }, 'r-sp-3');
      },
    },
    {
      path: 's4_p',
      getComponent(_nextState, callback) {
        require.ensure([], (require) => {
          callback(null, { formComponent: require('./Step4_Price/Container').default });
        }, 'r-sp-4');
      },
    },
    {
      path: 's5_r',
      getComponent(_nextState, callback) {
        require.ensure([], (require) => {
          callback(null, { formComponent: require('./Step5_Regulation/Container').default });
        }, 'r-sp-5');
      },
    },
    {
      path: 's6_cp',
      getComponent(_nextState, callback) {
        require.ensure([], (require) => {
          callback(null, { formComponent: require('./Step6_CancelPolicy/Container').default });
        }, 'r-sp-6');
      },
    },
    {
      path: 's7_cf',
      getComponent(_nextState, callback) {
        require.ensure([], (require) => {
          callback(null, { formComponent: require('./Step7_Confirm/Container').default });
        }, 'r-sp-7');
      },
    },
  ],
});
