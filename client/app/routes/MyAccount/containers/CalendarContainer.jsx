import { connect } from 'react-redux';

import Container from '../components/Calendar';
import { fetchCalendar, reset } from '../modules/myCalendar';

const mapStateToProps = (state) => {
  const { environment, myCalendar } = state;
  return ({ environment, myCalendar });
};

const mapDispatchToProps = dispatch => ({
  dispatch,
  dispatchCalendar: (startDate, endDate) => dispatch(fetchCalendar(startDate, endDate)),
  dispatchReset: () => dispatch(reset()),
});

export default connect(mapStateToProps, mapDispatchToProps)(Container);
