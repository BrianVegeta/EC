import { connect } from 'react-redux';
import swal, { errorConfig, successConfig } from 'lib/swal';
import {
  REDUCER_KEY as PASSWORD_CHANGE_REDUCER_KEY,
  changeData,
  reset,
  updatePassword,
  hasDataChanged,
} from '../modules/myManagePasswordChange';
import ManagePasswordChange from '../components/ManagePasswordChange';


/* =============================================>>>>>
= map props =
===============================================>>>>>*/
const mapStateToProps = ({
  environment,
  [PASSWORD_CHANGE_REDUCER_KEY]: passwordChange,
}) => ({
  environment,
  passwordChange,
  hasDataChanged: hasDataChanged(passwordChange),
});


/* =============================================>>>>>
= map dispatch =
===============================================>>>>>*/
const mapDispatchToProps = (dispatch) => {
  const dispatchUpdatePassword = () =>
    dispatch(updatePassword()).then(() => {
      swal(successConfig({ title: '變更密碼成功', text: null }));
    }).catch((message) => {
      swal(errorConfig({ title: '變更密碼失敗', text: message }));
    });

  return ({
    dispatchChangeData: data => dispatch(changeData(data)),
    dispatchReset: () => dispatch(reset()),
    dispatchUpdatePassword,
  });
};

export default connect(mapStateToProps, mapDispatchToProps)(ManagePasswordChange);
