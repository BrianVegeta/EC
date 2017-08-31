import { connect } from 'react-redux';
import Manage from '../components/Manage';


/* =============================================>>>>>
= map props =
===============================================>>>>>*/
const mapStateToProps = ({
  environment,
}) => ({
  environment,
});


/* =============================================>>>>>
= map dispatch =
===============================================>>>>>*/
// const mapDispatchToProps = (dispatch) => {
//
//   return ({
//   });
// };

export default connect(mapStateToProps)(Manage);
