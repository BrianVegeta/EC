import React, { PropTypes } from 'react';
import CropperJS from 'react-cropper';
import {
  CROP_BOX,
  DROPBOX_SIZE,
  CANVAS_WIDTH,
  CANVAS_HEIGHT,
} from '../../../../constants/coverCropper';

class Cropper extends React.Component {
  static propTypes = {
    src: PropTypes.string.isRequired,
    type: PropTypes.string.isRequired,
  };
  static directionToDegree(direction) {
    switch (direction) {
      case 'left': return -90;
      case 'right': return 90;
      default: return 0;
    }
  }
  constructor(props) {
    super(props);
    this.onCropperReady = this.onCropperReady.bind(this);
    this.state = {
      isCropperReady: false,
    };
  }
  componentDidUpdate() {
    if (this.state.isCropperReady && this.props.type === 'cropper') {
      const { width, naturalWidth } = this.cropper.getCanvasData();
      this.cropperInit = { width, naturalWidth };
      this.setCropperCover();
    } else {
      this.setRotatorContain();
    }
  }
  onCropperReady() {
    this.setRotatorContain();
    this.setState({ isCropperReady: true });
  }
  setCropperCover() {
    this.cropper.setDragMode('move');
    const {
      naturalHeight,
      naturalWidth,
    } = this.cropper.getCanvasData();
    const canvas = {};
    if (naturalHeight <= naturalWidth) {
      canvas.height = CROP_BOX;
      canvas.width = (canvas.height / naturalHeight) * naturalWidth;
      canvas.top = 40;
      canvas.left = (CANVAS_WIDTH - canvas.width) / 2;
    } else {
      canvas.width = CROP_BOX;
      canvas.height = (canvas.width / naturalWidth) * naturalHeight;
      canvas.left = 115;
      canvas.top = (CANVAS_HEIGHT - canvas.height) / 2;
    }
    this.cropper.setCanvasData(canvas);
    this.cropper.crop();
    this.cropper.setCropBoxData({
      top: 40,
      left: 115,
      width: CROP_BOX,
      height: CROP_BOX,
    });
  }
  setRotatorContain() {
    this.cropper.setDragMode('none');
    this.cropper.clear();
    const {
      naturalHeight,
      naturalWidth,
    } = this.cropper.getCanvasData();
    const canvas = {};
    if ((CANVAS_WIDTH / CANVAS_HEIGHT) >= (naturalWidth / naturalHeight)) {
      canvas.height = CANVAS_HEIGHT;
    } else {
      canvas.width = CANVAS_WIDTH;
    }
    this.cropper.setCanvasData(canvas);
    this.centerCanvas();
  }
  getCroppedCanvas() {
    return this.cropper.getCroppedCanvas({ height: 650, width: 650 });
  }
  getCroppedCanvasThumb() {
    return this.cropper.getCroppedCanvas({ height: DROPBOX_SIZE, width: DROPBOX_SIZE });
  }
  centerCanvas() {
    const canvasData = this.cropper.getCanvasData();
    const left = (CANVAS_WIDTH - canvasData.width) / 2;
    const top = (CANVAS_HEIGHT - canvasData.height) / 2;
    this.cropper.setCanvasData({ left, top });
  }
  rotate(direction) {
    const rotateDegree = this.constructor.directionToDegree(direction);
    this.cropper.rotate(rotateDegree);
    this.setRotatorContain();
  }
  zoomTo(increase) {
    const { width, naturalWidth } = this.cropperInit;
    const realRatio = width / naturalWidth;
    this.cropper.zoomTo(realRatio + ((realRatio * 2) * increase));
  }
  cropperConf() {
    return {
      src: this.props.src,
      checkOrientation: true,
      checkImageOrigin: false,
      checkCrossOrigin: false,
      autoCrop: true,
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
      <CropperJS
        ref={c => (this.cropper = c)}
        crossOrigin="Anonymous"
        {...this.cropperConf()}
      />
    );
  }
}

export default Cropper;
