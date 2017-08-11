import { connect } from 'react-redux';

import Container from '../components/Calendar';
import { } from '../modules/myCalendar';

const mapStateToProps = (state) => {
  const { environment, myCalendar } = state;
  return ({ environment, myCalendar });
};

const mapDispatchToProps = dispatch => ({
  dispatch
});

export default connect(mapStateToProps, mapDispatchToProps)(Container);
