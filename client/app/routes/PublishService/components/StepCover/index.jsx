import React from 'react';
import PropTypes from 'prop-types';

import myPropTypes from 'propTypes';
import FormContainer from 'components/Publish/FormContainer';
import SortableGallery from 'components/Publish/SortableGallery';
import CropperEditor from 'components/Publish/CropperEditor';
import ButtonNextStep, {
  STATUS_DISABLE,
  STATUS_LOADING,
  STATUS_VALID,
} from 'components/Button/NextStep';
import AlertPanel from 'components/AlertPanel';

import classnames from 'classnames/bind';
import CSS from 'react-css-modules';
import styles from './styles.sass';

const cx = classnames.bind(styles);
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
    dispatchProcessRawCovers: PropTypes.func.isRequired,
    nextStep: PropTypes.func.isRequired,
  };

  constructor(props) {
    super(props);
    this.state = {
      isUploading: false,
      displayNoImageError: false,
    };

    this.onNextStep = this.onNextStep.bind(this);
  }

  onNextStep() {
    const {
      covers,
      dispatchProcessRawCovers,
      nextStep,
    } = this.props;

    if (covers.length === 0) {
      this.setState({ displayNoImageError: true });
      return;
    }

    this.setState({ isUploading: true, displayNoImageError: false });
    dispatchProcessRawCovers()
    .then(() => {
      this.setState({ isUploading: false });
      nextStep();
    });
  }

  renderButtonStatus() {
    const {
      covers,
    } = this.props;

    if (covers.length === 0) {
      return STATUS_DISABLE;
    }
    if (this.state.isUploading) {
      return STATUS_LOADING;
    }
    return STATUS_VALID;
  }

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

    const { displayNoImageError } = this.state;

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
        {displayNoImageError &&
          <AlertPanel message="至少上傳一張圖片" marginBottom={40} />
        }
        <div styleName="footer">
          <ButtonNextStep
            status={this.renderButtonStatus()}
            onClick={this.onNextStep}
          />
        </div>
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
