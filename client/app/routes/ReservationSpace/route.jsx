import { omit } from 'lodash';
import { reservationSpace as router } from 'lib/paths';
import { injectReducer } from 'reducers';
import { checkStepsRestart } from 'modules/routingHelper';

import { REDUCER_KEY as RESERVATION_REDUCER_KEY } from './modules/reservation';
import { REDUCER_KEY as ITEM_REDUCER_KEY } from './modules/reservationItem';
import { REDUCER_KEY as COUPONS_REDUCER_KEY } from './modules/reservationCoupons';

import routeStepForm from './routes/routeStepForm';
import routeStepPayment from './routes/routeStepPayment';
import routeStepConfirm from './routes/routeStepConfirm';

const { indexPath } = router;
export default store => ({
  path: indexPath(':pid'),

  getComponent(_nextState, cb) {
    require.ensure([], (require) => {
      const Container = require('./containers/ReservationSpaceContainer').default;
      const reservationReducer = require('./modules/reservation').default;
      const itemReducer = require('./modules/reservationItem').default;
      const couponsReducer = require('./modules/reservationCoupons').default;

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
