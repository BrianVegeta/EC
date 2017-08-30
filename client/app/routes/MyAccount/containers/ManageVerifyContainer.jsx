import { connect } from 'react-redux';
import {
  REDUCER_KEY as MANAGE_REDUCER_KEY,
  changeData,
  reset,
  fetchUserData,
  connectFacebook,
} from '../modules/myManage';
import ManageVerify from '../components/ManageVerify';


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
    dispatchFetchUserData: () => dispatch(fetchUserData()),
    dispatchReset: () => dispatch(reset()),
    dispatchConnectFB: ({ userID, accessToken }) =>
      dispatch(connectFacebook({ userID, accessToken })),
  });
};

export default connect(mapStateToProps, mapDispatchToProps)(ManageVerify);
