import { injectReducer } from 'reducers';

const key = 'myCalendar';
export default store => ({
  path: 'calendar',

  getComponent(_nextState, cb) {
    require.ensure([], (require) => {
      const Container = require('../../containers/CalendarContainer').default;
      const reducer = require('../../modules/myCalendar').default;
      injectReducer(store, { key, reducer });
      cb(null, Container);
    }, 'my.calendar');
  },
});
