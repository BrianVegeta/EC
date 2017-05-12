import React, { PropTypes } from 'react';
import Modal from './ModalStatic';
import Dashboard from './Dashboard';
import CropperBoard from './CropperBoard';
import IMAGE_SRC from './CH3.jpg';

class ImageCropper extends React.Component {
  constructor(props) {
    super(props);
    this.enterCroping = this.enterCroping.bind(this);
    this.cancelCropping = this.cancelCropping.bind(this);
    this.state = {
      editorStatus: 'dashboard',
    };
  }
  enterCroping() {
    this.setState({ editorStatus: 'cropping' });
  }
  cancelCropping() {
    this.setState({ editorStatus: 'dashboard' });
  }
  renderEditor() {
    switch (this.state.editorStatus) {
      case 'cropping':
        return <CropperBoard imageSrc={IMAGE_SRC} cancelCropping={this.cancelCropping} />;
      case 'dashboard':
        return <Dashboard imageSrc={IMAGE_SRC} enterCroping={this.enterCroping} />;
      default:
        return <Dashboard imageSrc={IMAGE_SRC} enterCroping={this.enterCroping} />;
    }
  }
  render() {
    return (
      <Modal onClose={() => console.log('close')} {...this.props}>
        {this.renderEditor()}
      </Modal>
    );
  }
}

export default ImageCropper;
