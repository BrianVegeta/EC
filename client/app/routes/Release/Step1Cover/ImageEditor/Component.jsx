import React, { PropTypes } from 'react';
import Modal from './ModalStatic';
import EditorCrop from './EditorCrop';
import EditorRotate from './EditorRotate';
import ControllerDashboard from './ControllerDashboard';
import ControllerCrop from './ControllerCrop';
import IMAGE_SRC from './CH4.jpg';

const EDITOR_STATUS_DASHBOARD = 'DASHBOARD';
const EDITOR_STATUS_CROPPING = 'CROPPING';
class ImageCropper extends React.Component {
  constructor(props) {
    super(props);
    this.enterCroping = this.enterCroping.bind(this);
    this.cancelCropping = this.cancelCropping.bind(this);
    this.state = { editorStatus: EDITOR_STATUS_DASHBOARD };
  }
  enterCroping() {
    this.setState({ editorStatus: EDITOR_STATUS_CROPPING });
  }
  cancelCropping() {
    this.setState({ editorStatus: EDITOR_STATUS_DASHBOARD });
  }
  renderControllerCrop() {
    return (
      <ControllerCrop
        zoomTo={increase => this.cropper.zoomTo(increase)}
        onCancel={this.cancelCropping}
        onDone={this.cancelCropping}
      />
    );
  }
  renderControllerDashboard() {
    return (
      <ControllerDashboard
        rotate={dir => this.rotator.rotate(dir)}
        toCrop={this.enterCroping}
      />
    );
  }
  renderEditorCrop() {
    return <EditorCrop src={IMAGE_SRC} ref={c => (this.cropper = c)} />;
  }
  renderEditorRotate() {
    return <EditorRotate src={IMAGE_SRC} ref={r => (this.rotator = r)} />;
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
      <Modal {...this.props} isShow={this.props.open} >
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
