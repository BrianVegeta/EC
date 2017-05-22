import { fetchCategories } from '../../../actions/itemsActions';
import { confirmLeavePage } from '../../../funcs/confirm';


export default (routesHelper, dispatch) => ({
  path: '/p/release-goods',
  getComponent(_nextState, callback) {
    require.ensure([], (require) => {
      callback(null, {
        mainComponent: require('./Container').default,
      });
    }, 'release.goods');
  },
  indexRoute: {
    getComponent(_nextState, callback) {
      require.ensure([], (require) => {
        callback(null, { formComponent: require('./Step1_Cover/Container').default });
      }, 'r-g-1');
    },
  },
  onEnter: () => {
    window.addEventListener('beforeunload', confirmLeavePage);
  },
  childRoutes: [
    {
      path: 's2_a',
      getComponent(_nextState, callback) {
        require.ensure([], (require) => {
          callback(null, { formComponent: require('./Step2_About/Container').default });
        }, 'r-g-2');
      },
      onEnter: () => dispatch(fetchCategories()),
    },
    {
      path: 's3_d',
      getComponent(_nextState, callback) {
        require.ensure([], (require) => {
          callback(null, { formComponent: require('./Step3_Delivery/Container').default });
        }, 'r-g-3');
      },
    },
    {
      path: 's4_p',
      getComponent(_nextState, callback) {
        require.ensure([], (require) => {
          callback(null, { formComponent: require('./Step4_Price/Container').default });
        }, 'r-g-4');
      },
      childRoutes: [
        {
          path: 'd_c',
          getComponent(_nextState, callback) {
            require.ensure([], (require) => {
              const modalComponent = require('./Step4_Price/DiscountNew/Container').default;
              callback(null, { modalComponent });
            }, 'd_c');
          },
        },
      ],
    },
    {
      path: 's5_r',
      getComponent(_nextState, callback) {
        require.ensure([], (require) => {
          callback(null, { formComponent: require('./Step5_Regulation/Container').default });
        }, 'r-g-5');
      },
    },
    {
      path: 's6_cp',
      getComponent(_nextState, callback) {
        require.ensure([], (require) => {
          callback(null, { formComponent: require('./Step6_CancelPolicy/Container').default });
        }, 'r-g-6');
      },
    },
    {
      path: 's7_c',
      getComponent(_nextState, callback) {
        require.ensure([], (require) => {
          callback(null, { formComponent: require('./Container').default });
        }, 'r-g-7');
      },
    },
  ],
});
