import React, { PropTypes } from 'react';
import CropperJS from 'react-cropper';
import Modal from './ModalStatic';
import Controller from './Controller';
import CH1 from './CH1.jpg';
import CH2 from './CH2.jpg';
import CH3 from './CH3.jpg';

const CROP_BOX = 550;
class ImageCropper extends React.Component {
  constructor(props) {
    super(props);
    this.onCropperReady = this.onCropperReady.bind(this);
  }

  onCropperReady() {
    console.log(this.cropper.getCanvasData());
    // TODO: cavas size responsive
    this.cropper.setCanvasData({ height: CROP_BOX, width: 825, top: 40 });
    this.cropper.setCropBoxData({
      top: 40,
      left: 115,
      width: CROP_BOX,
      height: CROP_BOX,
    });
  }

  render() {
    const config2 = {
      viewMode: 1,
      dragMode: 'move',
      responsive: false,
      restore: false,
      center: false,
      background: false,
      guides: false,
      highlight: false,
      cropBoxMovable: false,
      cropBoxResizable: false,
      toggleDragModeOnDblclick: false,
      style: { height: '100%', width: '100%' },
    };
    return (
      <Modal
        onClose={() => console.log('close')}
        {...this.props}
        cropBoxSize={CROP_BOX}
      >
        <CropperJS
          src={CH2}
          {...config2}
          ready={this.onCropperReady}
          ref={c => (this.cropper = c)}
        />
        <Controller />
      </Modal>
    );
  }
}

export default ImageCropper;