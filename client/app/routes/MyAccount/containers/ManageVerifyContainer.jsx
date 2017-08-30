import { connect } from 'react-redux';
import swal, { errorConfig, successConfig } from 'lib/swal';
import {
  REDUCER_KEY as MANAGE_REDUCER_KEY,
  changeData,
  reset,
  fetchUserData,
  connectFacebook,
  disconnectFacebook,
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
  const dispatchConnectFB = ({ userID, accessToken }) =>
    dispatch(connectFacebook({ userID, accessToken })).then(() => {
      swal(successConfig({ title: 'Facebook 連結成功', text: null }));
    }).catch((message) => {
      swal(errorConfig({
        title: 'Facebook 連結失敗',
        text: message,
      }));
    });

  const dispatchDisconnectFB = ({ userID, accessToken }) =>
    dispatch(disconnectFacebook({ userID, accessToken })).then(() => {
      swal(successConfig({ title: 'Facebook 成功取消連結', text: null }));
    }).catch((message) => {
      swal(errorConfig({
        title: 'Facebook 取消連結失敗',
        text: message,
      }));
    });

  return ({
    dispatchChangeData: data => dispatch(changeData(data)),
    dispatchFetchUserData: () => dispatch(fetchUserData()),
    dispatchReset: () => dispatch(reset()),
    dispatchConnectFB,
    dispatchDisconnectFB,
  });
};

export default connect(mapStateToProps, mapDispatchToProps)(ManageVerify);
