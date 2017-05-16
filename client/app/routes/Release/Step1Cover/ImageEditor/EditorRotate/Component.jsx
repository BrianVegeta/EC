import React, { PropTypes } from 'react';
import CropperJS from 'react-cropper';
import {
  CANVAS_WIDTH,
  CANVAS_HEIGHT,
} from '../../../../../constants/coverCropper';

class ImageRotator extends React.Component {
  static defaultProps = {
    data: null,
  };
  static propTypes = {
    src: PropTypes.string.isRequired,
    data: PropTypes.objectOf(PropTypes.number),
  };
  constructor(props) {
    super(props);
    this.onCropperReady = this.onCropperReady.bind(this);
  }
  onCropperReady() {
    const { data } = this.props;
    if (this.props.data) {
      console.log(data);
      this.cropper.setData(this.props.data);
    }
  }
  getDataUrl() {
    return this.cropper.getCroppedCanvas().toDataURL();
  }
  setBlob(callback) {
    this.cropper.getCroppedCanvas().toBlob((blob) => {
      callback(URL.createObjectURL(blob));
    });
  }
  getImageData() {
    return this.cropper.getImageData();
  }
  getData() {
    return this.cropper.getData();
  }
  centerCanvas() {
    const canvasData = this.cropper.getCanvasData();
    const left = (CANVAS_WIDTH - canvasData.width) / 2;
    const top = (CANVAS_HEIGHT - canvasData.height) / 2;
    this.cropper.setCanvasData({ left, top });
  }
  rotate(direction) {
    let rotateDegree = 0;
    switch (direction) {
      case 'left':
        rotateDegree = -90;
        break;
      case 'right':
        rotateDegree = 90;
        break;
      default:
    }
    this.cropper.rotate(rotateDegree);
    this.centerCanvas();
  }
  cropperConf() {
    return {
      src: this.props.src,
      ready: this.onCropperReady,
      viewMode: 2,
      autoCrop: false,
      dragMode: 'none',
      responsive: false,
      restore: false,
      center: false,
      background: false,
      guides: false,
      highlight: false,
      movable: false,
      scalable: false,
      zoomable: false,
      cropBoxMovable: false,
      cropBoxResizable: false,
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

export default ImageRotator;
