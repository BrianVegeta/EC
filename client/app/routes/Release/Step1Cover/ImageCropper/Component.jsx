import React, { PropTypes } from 'react';
import CropperJS from 'react-cropper';
import Modal from './Modal';

const IMAGE_1 = 'http://cdn.collider.com/wp-content/uploads/2015/10/charlize-theron-mad-max-fury-road.jpg';
const IMAGE_2 = 'https://i0.wp.com/www.imagesqueen.com/wp-content/uploads/2016/09/Hot-Shruti-Hassan-Hot-4.jpg';
class ImageCropper extends React.Component {
  render() {
    const config = {
      viewMode: 3,
      dragMode: 'move',
      autoCropArea: 1,
      restore: false,
      modal: false,
      center: false,
      background: false,
      guides: false,
      highlight: false,
      cropBoxMovable: false,
      cropBoxResizable: false,
      toggleDragModeOnDblclick: false,
      style: { height: '100%', width: '100%' },
    };
    const config2 = {
      viewMode: 1,
      dragMode: 'move',
      autoCropArea: 0.65,
      restore: false,
      guides: false,
      highlight: false,
      cropBoxMovable: false,
      cropBoxResizable: false,
      style: { height: '100%', width: '100%' },
    };
    return (
      <Modal onClose={() => console.log('close')} {...this.props}>
        <CropperJS
          ref={c => (this.cropper = c)}
          src={IMAGE_1}
          {...config}
        />
        <div>controller</div>
      </Modal>
    );
  }
}

export default ImageCropper;
