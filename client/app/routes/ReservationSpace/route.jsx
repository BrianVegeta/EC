import { omit } from 'lodash';
import { reservationSpace as router } from 'lib/paths';
import { injectReducer } from 'reducers';
import { checkStepsRestart } from 'modules/routingHelper';
import routeStepForm from './routes/routeStepForm';
import routeStepPayment from './routes/routeStepPayment';
import routeStepConfirm from './routes/routeStepConfirm';

const { indexPath } = router;
export default store => ({
  path: indexPath(':pid'),

  getComponent(_nextState, cb) {
    require.ensure([], (require) => {
      const Container = require('./containers/ReservationSpaceContainer').default;

      const {
        REDUCER_KEY: RESERVATION_REDUCER_KEY,
        default: reservationReducer,
      } = require('./modules/reservation');
      const {
        REDUCER_KEY: ITEM_REDUCER_KEY,
        default: itemReducer,
      } = require('./modules/reservationItem');
      const {
        REDUCER_KEY: COUPONS_REDUCER_KEY,
        default: couponsReducer,
      } = require('./modules/reservationCoupons');

      injectReducer(store, { key: RESERVATION_REDUCER_KEY, reducer: reservationReducer });
      injectReducer(store, { key: ITEM_REDUCER_KEY, reducer: itemReducer });
      injectReducer(store, { key: COUPONS_REDUCER_KEY, reducer: couponsReducer });

      cb(null, Container);
    }, 'reservation.service');
  },

  indexRoute: omit(routeStepForm(store), ['path']),

  onEnter: ({ params: { pid }, location: { query } }) => {
    const { cid } = query;
    const stepStartPath = router.indexPath(pid, cid);
    store.dispatch(checkStepsRestart(stepStartPath));
  },

  childRoutes: [
    routeStepForm(store),
    routeStepPayment(store),
    routeStepConfirm(store),
  ],
});
