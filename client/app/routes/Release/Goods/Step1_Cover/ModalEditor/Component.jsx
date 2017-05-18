import React, { PropTypes } from 'react';
import Modal from './ModalStatic';
import ControllerDashboard from './ControllerDashboard';
import ControllerCrop from './ControllerCrop';
import {
  cancelEditor,
  updatingCover,
  updatedCover,
  uploadCover,
} from '../../../../../actions/editorCoversActions';
import Cropper from './Cropper';

const EDITOR_STATUS_DASHBOARD = 'DASHBOARD';
const EDITOR_STATUS_CROPPING = 'CROPPING';
class ImageCropper extends React.Component {
  static propTypes = {
    open: PropTypes.bool.isRequired,
    current: PropTypes.objectOf(PropTypes.string).isRequired,
    dispatch: PropTypes.func.isRequired,
  };
  static toBlob(dataUrl) {
    const binStr = atob(dataUrl.split(',')[1]);
    const len = binStr.length;
    const arr = new Uint8Array(len);
    for (let i = 0; i < len; i += 1) {
      arr[i] = binStr.charCodeAt(i);
    }
    return new Blob([arr], { type: 'image/png' });
  }
  constructor(props) {
    super(props);
    this.enterCroping = this.enterCroping.bind(this);
    this.cancelCropping = this.cancelCropping.bind(this);
    this.completeCropped = this.completeCropped.bind(this);
    this.onEditorCancel = this.onEditorCancel.bind(this);
    this.modalReady = this.modalReady.bind(this);
    this.onComplete = this.onComplete.bind(this);
    this.state = {
      image: this.props.current.blob,
      editorStatus: EDITOR_STATUS_DASHBOARD,
      croppedCanvas: null,
      isModalOpened: false,
    };
  }
  onEditorCancel() {
    this.props.dispatch(cancelEditor());
  }
  onComplete() {
    const { dispatch, current } = this.props;
    const { croppedCanvas } = this.state;
    const croppedDataUrl = (
      croppedCanvas ?
      croppedCanvas.toDataURL() :
      this.cropper.getCroppedCanvas().toDataURL()
    );
    dispatch(updatingCover(current.key, croppedDataUrl));
    dispatch(cancelEditor());
    const uploadCB = (returnUrl) => {
      dispatch(updatedCover(current.key, returnUrl));
    };
    dispatch(uploadCover(croppedDataUrl, uploadCB));
  }
  getCropperType() {
    switch (this.state.editorStatus) {
      case EDITOR_STATUS_CROPPING:
        return 'cropper';
      case EDITOR_STATUS_DASHBOARD:
        return 'dashboard';
      default:
        return 'dashboard';
    }
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
    const { croppedCanvas } = this.state;
    return (
      <Modal
        {...this.props}
        isShow={this.props.open}
        onClose={this.onEditorCancel}
        onEntered={this.modalReady}
      >
        {
          this.state.isModalOpened &&
          <div styleName="container">
            <div styleName="cropper">
              { croppedCanvas &&
                <div styleName="croppedCanvas">
                  <div
                    style={{
                      height: 550,
                      width: 550,
                      background: `url(${croppedCanvas.toDataURL()}) center center/cover no-repeat`,
                      margin: '0 auto',
                    }}
                  />
                </div>
              }
              <Cropper
                src={this.state.image}
                type={this.getCropperType()}
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

export default ImageCropper;
