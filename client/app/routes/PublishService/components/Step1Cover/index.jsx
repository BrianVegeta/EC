import React from 'react';
import PropTypes from 'prop-types';

import myPropTypes from 'propTypes';
import FormContainer from 'components/Publish/FormContainer';
import SortableGallery from 'components/Publish/SortableGallery';
import CropperEditor from 'components/Publish/CropperEditor';

import classnames from 'classnames/bind';
import CSS from 'react-css-modules';
import styles from './styles.sass';

const cx = classnames.bind(styles);
// <ButtonNextStep
//   onNext: this.constructor.saveAndNext,
//   onValid: this.validateAll,
//   isDisabled: !this.isAllValid(),
//   beforeNext: this.beforeNext,
//   waitingCount: this.constructor.getUnStoredsCount(coverThumbs),
// />
class Step1Cover extends React.Component {

  static propTypes = {
    covers: PropTypes.arrayOf(PropTypes.object).isRequired,
    dispatchCreateCover: PropTypes.func.isRequired,
    dispatchDeleteCover: PropTypes.func.isRequired,
    dispatchChangeOrders: PropTypes.func.isRequired,
    dispatchOpenCropper: PropTypes.func.isRequired,
    environment: myPropTypes.environment.isRequired,
    cropper: PropTypes.shape({
      key: PropTypes.string,
      blob: PropTypes.string,
    }).isRequired,
    dispatchUploadCover: PropTypes.func.isRequired,
    dispatchCloseCropper: PropTypes.func.isRequired,
  };

  render() {
    const {
      covers,
      dispatchCreateCover,
      dispatchDeleteCover,
      dispatchChangeOrders,
      dispatchOpenCropper,
    } = this.props;

    const {
      environment,
      cropper,
      dispatchCloseCropper,
      dispatchUploadCover,
    } = this.props;

    // const p1 = () =>
    //   new Promise((resolve, reject) =>
    //     setTimeout(() => {
    //       console.log(1);
    //       return resolve(1);
    //     }, 2000),
    //   );
    // const p2 = () =>
    //   new Promise((resolve, reject) =>
    //     setTimeout(() => {
    //       console.log(2);
    //       return resolve(2);
    //     }, 3000),
    //   );
    // const p3 = () =>
    //   new Promise((resolve, reject) =>
    //     setTimeout(() => {
    //       console.log(3);
    //       return resolve(3);
    //     }, 1000),
    //   );
    //
    // Promise.all([p1(), p2(), p3()])
    // .then(results => console.log(results))
    // .catch(e => console.log(e));

    return (
      <FormContainer title="上傳照片" >
        <ul className={cx('noticeList')}>
          <li>最多新增3張照片</li>
          <li>圖片格式：jpg、jpge、png</li>
          <li>每一張不得超過2MB</li>
          <li>尺寸建議為650x650px</li>
        </ul>
        <SortableGallery
          covers={covers}
          createCover={dispatchCreateCover}
          deleteCover={dispatchDeleteCover}
          changeOrders={dispatchChangeOrders}
          openCropper={dispatchOpenCropper}
        />
        {cropper.blob &&
          <CropperEditor
            cropper={cropper}
            closeCropper={dispatchCloseCropper}
            uploadCover={dispatchUploadCover}
            screenHeight={environment.height}
          />
        }
      </FormContainer>
    );
  }
}

export default CSS(Step1Cover, styles);
