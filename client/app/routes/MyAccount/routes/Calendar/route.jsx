import { injectReducer } from 'reducers';
import { my } from 'lib/paths';

const key = 'myCalendar';
export default store => ({
  path: my.calendarPath,

  getComponent(_nextState, cb) {
    require.ensure([], (require) => {
      const Container = require('../../containers/CalendarContainer').default;
      const reducer = require('../../modules/myCalendar').default;
      injectReducer(store, { key, reducer });
      cb(null, Container);
    }, 'my.calendar');
  },
});
