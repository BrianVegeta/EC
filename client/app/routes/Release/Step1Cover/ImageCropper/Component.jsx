import React, { PropTypes } from 'react';
import CropperJS from 'react-cropper';
import Modal from './ModalStatic';
import CH1 from './CH1.jpg';
import CH2 from './CH2.jpg';
import CH3 from './CH3.jpg';

const DIALOG_HEIGHT = 750;
const CROPPER_HEIGHT = 700;
const CROP_BOX = 650;
const DIALOG_WIDTH = 780;
class ImageCropper extends React.Component {
  constructor(props) {
    super(props);
    this.onCropperReady = this.onCropperReady.bind(this);
  }

  onCropperReady() {
    console.log(this.cropper.getCanvasData());
    this.cropper.setCanvasData({ height: CROP_BOX, width: 975, top: 40 });
    this.cropper.setCropBoxData({
      top: 40,
      left: 75,
      width: CROP_BOX,
      height: CROP_BOX,
    });
    // console.log(this.cropper.getCanvasData());
    // const width = this.cropper.getCanvasData().width;
    // this.cropper.setCanvasData({ left: (780 - width) / 2 });
    // console.log(this.cropper.getCanvasData());
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
      <Modal onClose={() => console.log('close')} {...this.props}>
        <CropperJS
          ref={c => (this.cropper = c)}
          src={CH2}
          {...config2}
          ready={this.onCropperReady}
        />
        <div>controller</div>
      </Modal>
    );
  }
}

export default ImageCropper;
