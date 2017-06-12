import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import CSS from 'react-css-modules';
import styles from './styles.sass';
import Modal from './ModalStatic';
import ControllerDashboard from './ControllerDashboard';
import ControllerCrop from './ControllerCrop';
import { uploadCoverAndUpdateThumbs } from '../../../../../actions/publishThumbsActions';
import { closeCropper } from '../../../../../actions/publishCropperActions';
import Cropper from './Cropper';
import CroppedCanvas from './CroppedCanvas';

const EDITOR_STATUS_DASHBOARD = 'DASHBOARD';
const EDITOR_STATUS_CROPPING = 'CROPPING';
class ModalCropper extends React.Component {
  static propTypes = {
    publish: PropTypes.shape({
      coverCropper: PropTypes.object,
    }).isRequired,
    dispatch: PropTypes.func.isRequired,
  };
  constructor(props) {
    super(props);
    this.enterCroping = this.enterCroping.bind(this);
    this.cancelCropping = this.cancelCropping.bind(this);
    this.completeCropped = this.completeCropped.bind(this);
    this.onEditorCancel = this.onEditorCancel.bind(this);
    this.modalReady = this.modalReady.bind(this);
    this.onComplete = this.onComplete.bind(this);
    this.state = {
      image: props.publish.coverCropper.blob,
      editorStatus: EDITOR_STATUS_DASHBOARD,
      croppedCanvas: null,
      isModalOpened: false,
    };
  }
  onEditorCancel() {
    this.props.dispatch(closeCropper());
  }
  onComplete() {
    const { dispatch, publish } = this.props;
    const { coverCropper } = publish;
    const { croppedCanvas } = this.state;
    const croppedDataUrl = croppedCanvas ?
      croppedCanvas.toDataURL() :
      this.cropper.getCroppedCanvas().toDataURL();
    dispatch(uploadCoverAndUpdateThumbs(coverCropper.key, croppedDataUrl));
    dispatch(closeCropper());
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
    const { croppedCanvas, isModalOpened } = this.state;
    return (
      <Modal
        isShow
        {...this.props}
        onClose={this.onEditorCancel}
        onEntered={this.modalReady}
      >
        {
          isModalOpened &&
          <div styleName="container">
            <div styleName="cropper">
              {
                croppedCanvas &&
                <CroppedCanvas
                  className={styles.croppedCanvas}
                  dataUrl={croppedCanvas.toDataURL()}
                />
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

const mapStateToProps = (state) => {
  const { environment, routesHelper, publish } = state;
  return ({ environment, routesHelper, publish });
};
export default connect(mapStateToProps)(CSS(ModalCropper, styles));
