import { connect } from 'react-redux';
import swal, { successConfig } from 'lib/swal';
import { changeCurrentUser } from 'modules/auth';
import {
  REDUCER_KEY as PROFILE_REDUCER_KEY,
  fetchUserprofile,
  updateUserprofile,
  uploadAvatar,
  changeData,
  reset,
} from '../modules/myProfile';
import {
  REDUCER_KEY as CROPPER_REDUCER_KEY,
  openCropper,
  closeCropper,
} from '../modules/avatarCropper';
import Profile from '../components/Profile';


/* =============================================>>>>>
= map props =
===============================================>>>>>*/
const mapStateToProps = ({
  environment,
  auth: { currentUser },
  [PROFILE_REDUCER_KEY]: profile,
  [CROPPER_REDUCER_KEY]: cropper,
}) => ({
  environment,
  currentUser,
  profile,
  cropper,
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
    dispatchOpenCropper: blob => dispatch(openCropper(blob)),
    dispatchCloseCropper: () => dispatch(closeCropper()),
    dispatchUploadAvatar: blob => dispatch(uploadAvatar(blob)),
    dispatchFetchUserprofile,
    dispatchUpdateUserprofile,
    dispatchChangeData: data => dispatch(changeData(data)),
    dispatchReset: () => dispatch(reset()),
  });
};

export default connect(mapStateToProps, mapDispatchToProps)(Profile);
