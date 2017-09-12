import React from 'react';
import PropTypes from 'prop-types';

import CSS from 'react-css-modules';
import styles from './styles.sass';
import Modal from './ModalStatic';
import ControllerDashboard from './ControllerDashboard';
import ControllerCrop from './ControllerCrop';
import Cropper from './Cropper';
import CroppedCanvas from './CroppedCanvas';
import {
  EDITOR_STATUS_DASHBOARD,
  EDITOR_STATUS_CROPPING,
} from './constants';

class CropperEditor extends React.Component {

  static propTypes = {
    cropper: PropTypes.shape({
      key: PropTypes.string,
      blob: PropTypes.string,
    }).isRequired,
    uploadCover: PropTypes.func.isRequired,
    closeCropper: PropTypes.func.isRequired,
    screenHeight: PropTypes.number.isRequired,
  };

  constructor(props) {
    super(props);
    this.enterCroping = this.enterCroping.bind(this);
    this.cancelCropping = this.cancelCropping.bind(this);
    this.completeCropped = this.completeCropped.bind(this);
    this.handleClickOutside = this.handleClickOutside.bind(this);
    this.modalReady = this.modalReady.bind(this);
    this.onComplete = this.onComplete.bind(this);
    this.state = {
      image: props.cropper.blob,
      editorStatus: EDITOR_STATUS_DASHBOARD,
      croppedCanvas: null,
      isModalOpened: false,
    };
  }

  componentDidMount() {
    document.addEventListener('click', this.handleClickOutside, false);
  }

  componentWillUnmount() {
    document.removeEventListener('click', this.handleClickOutside, false);
  }

  handleClickOutside(e) {
    if (this.contentBox.contains(e.target)) {
      return;
    }
    this.props.closeCropper();
  }

  onComplete() {
    const {
      cropper,
      uploadCover,
      closeCropper,
    } = this.props;
    const { croppedCanvas } = this.state;
    const croppedDataUrl = croppedCanvas ?
      croppedCanvas.toDataURL() :
      this.cropper.getCroppedCanvas().toDataURL();

    uploadCover(cropper.key, croppedDataUrl);
    closeCropper();
  }

  modalReady() {
    this.setState({ isModalOpened: true });
  }

  enterCroping() {
    this.setState({
      editorStatus: EDITOR_STATUS_CROPPING,
      croppedCanvas: null,
    });
  }

  completeCropped() {
    this.setState({
      editorStatus: EDITOR_STATUS_DASHBOARD,
      croppedCanvas: this.cropper.getCroppedCanvas(),
    });
  }

  cancelCropping() {
    this.setState({
      editorStatus: EDITOR_STATUS_DASHBOARD,
    });
  }

  rotateWithDir(dir) {
    this.cropper.rotate(dir);
    this.setState({
      croppedCanvas: null,
    });
  }

  renderControllerCrop() {
    return (
      <ControllerCrop
        zoomTo={increase => this.cropper.zoomTo(increase)}
        onCancel={this.cancelCropping}
        onDone={this.completeCropped}
      />
    );
  }

  renderControllerDashboard() {
    return (
      <ControllerDashboard
        rotate={dir => this.rotateWithDir(dir)}
        toCrop={this.enterCroping}
        onComplete={this.onComplete}
      />
    );
  }

  renderController() {
    switch (this.state.editorStatus) {
      case EDITOR_STATUS_CROPPING:
        return this.renderControllerCrop();
      case EDITOR_STATUS_DASHBOARD:
        return this.renderControllerDashboard();
      default:
        return this.renderControllerDashboard();
    }
  }

  render() {
    const {
      croppedCanvas,
      isModalOpened,
      image,
      editorStatus,
    } = this.state;

    const {
      closeCropper,
    } = this.props;
    return (
      <Modal
        isShow
        screenHeight={this.props.screenHeight}
        onClose={closeCropper}
        onEntered={this.modalReady}
      >
        {
          isModalOpened &&
          <div styleName="container">
            <div styleName="cropper" ref={contentBox => (this.contentBox = contentBox)}>
              {
                croppedCanvas &&
                <CroppedCanvas
                  className={styles.croppedCanvas}
                  dataUrl={croppedCanvas.toDataURL()}
                />
              }
              <Cropper
                src={image}
                type={editorStatus}
                ref={c => (this.cropper = c)}
              />
            </div>
            <div styleName="controller">
              {this.renderController()}
            </div>
          </div>
        }
      </Modal>
    );
  }
}

export default CSS(CropperEditor, styles);
