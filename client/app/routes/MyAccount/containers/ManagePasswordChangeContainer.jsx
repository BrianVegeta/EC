import { connect } from 'react-redux';
import {
  REDUCER_KEY as MANAGE_REDUCER_KEY,
  changeData,
  reset,
} from '../modules/myManage';
import ManagePasswordChange from '../components/ManagePasswordChange';


/* =============================================>>>>>
= map props =
===============================================>>>>>*/
const mapStateToProps = ({
  environment,
  [MANAGE_REDUCER_KEY]: manage,
}) => ({
  environment,
  manage,
});


/* =============================================>>>>>
= map dispatch =
===============================================>>>>>*/
const mapDispatchToProps = (dispatch) => {

  return ({
    dispatchChangeData: data => dispatch(changeData(data)),
    dispatchReset: () => dispatch(reset()),
  });
};

export default connect(mapStateToProps, mapDispatchToProps)(ManagePasswordChange);
