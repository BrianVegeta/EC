import { connect } from 'react-redux';

import StepAbout from '../components/StepAbout';
import { changeData } from '../modules/publish';

/* pick props */
const mapStateToProps = ({ environment, publish }) => ({
  environment, publish,
});

/* pick dispatch */
const mapDispatchToProps = dispatch => ({
  dispatchChangeData: data => dispatch(changeData(data)),
});

export default connect(mapStateToProps, mapDispatchToProps)(StepAbout);
