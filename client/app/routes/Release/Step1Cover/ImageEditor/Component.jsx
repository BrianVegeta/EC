import React, { PropTypes } from 'react';
import Modal from './ModalStatic';
import Dashboard from './Dashboard';
import IMAGE_SRC from './CH3.jpg';

class ImageCropper extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      editorStatus: 'dashboard',
    };
  }
  renderEditor() {
    switch (this.state.editorStatus) {
      case 'dashboard':
        return <Dashboard imageSrc={IMAGE_SRC} />;
      default:
        return <Dashboard imageSrc={IMAGE_SRC} />;
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
