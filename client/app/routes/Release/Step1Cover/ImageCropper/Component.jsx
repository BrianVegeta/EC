import React, { PropTypes } from 'react';
import CropperJS from 'react-cropper';
import Modal from './ModalStatic';
import Controller from './Controller';
import IMAGE from './CH1.jpg';

const CROP_BOX = 550;
const CANVAS_WIDTH = 780;
const CANVAS_HEIGHT = 600;
class ImageCropper extends React.Component {
  constructor(props) {
    super(props);
    this.onCropperReady = this.onCropperReady.bind(this);
  }
  onCropperReady() {
    // TODO: cavas size responsive
    const canvas = this.cropper.getCanvasData();
    const canvasContain = {};
    if (canvas.naturalHeight < canvas.naturalWidth) {
      canvasContain.height = CROP_BOX;
      canvasContain.width =
        (canvasContain.height / canvas.naturalHeight)
        * canvas.naturalWidth;
      canvasContain.top = 40;
      canvasContain.left = (CANVAS_WIDTH - canvasContain.width) / 2;
    } else {
      canvasContain.width = CROP_BOX;
      canvasContain.height =
        (canvasContain.width / canvas.naturalWidth)
        * canvas.naturalHeight;
      canvasContain.left = 115;
      canvasContain.top = (CANVAS_HEIGHT - canvasContain.height) / 2;
    }
    this.cropper.setCanvasData(canvasContain);
    this.cropper.setCropBoxData({
      top: 40,
      left: 115,
      width: CROP_BOX,
      height: CROP_BOX,
    });
    this.canvasData = this.cropper.getCanvasData();
  }
  onZoom(increase) {
    const realRatio = this.canvasData.width / this.canvasData.naturalWidth;
    this.cropper.zoomTo(realRatio + ((realRatio * 2) * increase));
  }
  onRotate(direction) {
    switch (direction) {
      case 'left':
        this.cropper.rotate(-90);
        break;
      case 'right':
        this.cropper.rotate(90);
        break;
      default:
    }
  }
  cropperConf(src) {
    return {
      src,
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
      ready: this.onCropperReady,
      toggleDragModeOnDblclick: false,
      style: { height: '100%', width: '100%' },
    };
  }
  render() {
    return (
      <Modal
        onClose={() => console.log('close')}
        {...this.props}
      >
        <CropperJS
          ref={c => (this.cropper = c)}
          {...this.cropperConf(IMAGE)}
        />
        <Controller
          {...{
            zoom: increase => (this.onZoom(increase)),
            rotate: direction => (this.onRotate(direction)),
          }}
        />
      </Modal>
    );
  }
}

export default ImageCropper;
