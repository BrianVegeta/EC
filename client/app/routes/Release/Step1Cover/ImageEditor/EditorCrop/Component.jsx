import React, { PropTypes } from 'react';
import CropperJS from 'react-cropper';
import {
  CROP_BOX,
  CANVAS_WIDTH,
  CANVAS_HEIGHT,
} from '../../../../../constants/coverCropper';

class ImageCropper extends React.Component {
  static propTypes = {
    src: PropTypes.string.isRequired,
  };
  constructor(props) {
    super(props);
    this.onCropperReady = this.onCropperReady.bind(this);
  }
  onCropperReady() {
    const canvas = this.cropper.getCanvasData();
    const canvasContain = {};
    if (canvas.naturalHeight <= canvas.naturalWidth) {
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
      top: 40, left: 115, width: CROP_BOX, height: CROP_BOX,
    });
    this.canvasData = this.cropper.getCanvasData();
  }
  getDataUrl() {
    return this.cropper.getCroppedCanvas().toDataURL();
  }
  getBlob() {
    return this.cropper.getCroppedCanvas().toBlob(blob => (blob));
  }
  centerCanvas() {
    const canvasData = this.cropper.getCanvasData();
    const left = (CANVAS_WIDTH - canvasData.width) / 2;
    const top = (CANVAS_HEIGHT - canvasData.height) / 2;
    this.cropper.setCanvasData({ left, top });
  }
  zoomTo(increase) {
    const realRatio = this.canvasData.width / this.canvasData.naturalWidth;
    this.cropper.zoomTo(realRatio + ((realRatio * 2) * increase));
  }
  cropperConf() {
    // TODO: disable wheel zoom in
    return {
      src: this.props.src,
      viewMode: 1,
      dragMode: 'move',
      responsive: false,
      restore: false,
      center: false,
      background: false,
      guides: false,
      highlight: false,
      zoomOnWheel: false,
      cropBoxMovable: false,
      cropBoxResizable: false,
      ready: this.onCropperReady,
      toggleDragModeOnDblclick: false,
      style: { height: '100%', width: '100%' },
    };
  }
  render() {
    return (
      <CropperJS ref={c => (this.cropper = c)} {...this.cropperConf()} />
    );
  }
}

export default ImageCropper;
