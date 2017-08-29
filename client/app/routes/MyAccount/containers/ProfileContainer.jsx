import { connect } from 'react-redux';
import swal, { successConfig } from 'lib/swal';
import { changeCurrentUser } from 'modules/auth';
import {
  REDUCER_KEY as PROFILE_REDUCER_KEY,
  fetchUserprofile,
  updateUserprofile,
  changeData,
  reset,
} from '../modules/myProfile';
import Profile from '../components/Profile';


/* =============================================>>>>>
= map props =
===============================================>>>>>*/
const mapStateToProps = ({
  environment,
  auth: { currentUser },
  [PROFILE_REDUCER_KEY]: profile,
}) => ({
  environment,
  currentUser,
  profile,
});


/* =============================================>>>>>
= map dispatch =
===============================================>>>>>*/
const mapDispatchToProps = (dispatch) => {
  const dispatchFetchUserprofile = () => {
    dispatch(fetchUserprofile());
  };

  const dispatchUpdateUserprofile = () => {
    dispatch(updateUserprofile()).then((changedData) => {
      swal(successConfig({ title: '成功', text: '公開資訊已編輯成功。' }));
      dispatch(changeCurrentUser(changedData));
    });
  };

  return ({
    dispatchFetchUserprofile,
    dispatchUpdateUserprofile,
    dispatchChangeData: data => dispatch(changeData(data)),
    dispatchReset: () => dispatch(reset()),
  });
};

export default connect(mapStateToProps, mapDispatchToProps)(Profile);
