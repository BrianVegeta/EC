import React, { PropTypes } from 'react';
import Modal from './ModalStatic';
import EditorCrop from './EditorCrop';
import EditorRotate from './EditorRotate';
import ControllerDashboard from './ControllerDashboard';
import ControllerCrop from './ControllerCrop';
import { cancelEditor, setEditorCurrent } from '../../../../actions/editorCoversActions';

const EDITOR_STATUS_DASHBOARD = 'DASHBOARD';
const EDITOR_STATUS_CROPPING = 'CROPPING';
class ImageCropper extends React.Component {
  static propTypes = {
    open: PropTypes.bool.isRequired,
    image: PropTypes.string.isRequired,
    dispatch: PropTypes.func.isRequired,
  };
  constructor(props) {
    super(props);
    this.enterCroping = this.enterCroping.bind(this);
    this.cancelCropping = this.cancelCropping.bind(this);
    this.completeCropped = this.completeCropped.bind(this);
    this.onEditorCancel = this.onEditorCancel.bind(this);
    this.state = { editorStatus: EDITOR_STATUS_DASHBOARD };
  }
  onEditorCancel() {
    this.props.dispatch(cancelEditor());
  }
  enterCroping() {
    this.props.dispatch(setEditorCurrent(this.rotator.getDataUrl()));
    this.setState({ editorStatus: EDITOR_STATUS_CROPPING });
  }
  completeCropped() {
    this.props.dispatch(setEditorCurrent(this.cropper.getDataUrl()));
    this.setState({ editorStatus: EDITOR_STATUS_DASHBOARD });
  }
  cancelCropping() {
    this.setState({ editorStatus: EDITOR_STATUS_DASHBOARD });
  }
  rotateWithDir(dir) {
    this.rotator.rotate(dir);
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
      />
    );
  }
  renderEditorCrop() {
    return <EditorCrop src={this.props.image} ref={c => (this.cropper = c)} />;
  }
  renderEditorRotate() {
    return <EditorRotate src={this.props.image} ref={r => (this.rotator = r)} />;
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
  renderEditor() {
    switch (this.state.editorStatus) {
      case EDITOR_STATUS_CROPPING:
        return this.renderEditorCrop();
      case EDITOR_STATUS_DASHBOARD:
        return this.renderEditorRotate();
      default:
        return this.renderEditorRotate();
    }
  }
  render() {
    return (
      <Modal
        {...this.props}
        isShow={this.props.open}
        onClose={this.onEditorCancel}
      >
        <div styleName="container">
          <div styleName="cropper">
            {this.renderEditor()}
          </div>
          <div styleName="controller">
            {this.renderController()}
          </div>
        </div>
      </Modal>
    );
  }
}

export default ImageCropper;
