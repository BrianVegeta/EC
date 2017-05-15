import React, { PropTypes } from 'react';
import CameraIcon from 'react-icons/lib/ti/camera-outline';
import Dropper from './Dropper';

class Dropzone extends React.Component {
  static defaultProps = {
    isCover: false,
    imageBlob: null,
  };
  static propTypes = {
    isCover: PropTypes.bool,
    imageBlob: PropTypes.string,
    onDrop: PropTypes.func.isRequired,
  };
  constructor(props) {
    super(props);
    this.setDropped = this.setDropped.bind(this);
    this.onMouseEnter = this.onMouseEnter.bind(this);
    this.onMouseLeave = this.onMouseLeave.bind(this);
    this.state = { isHover: false };
  }
  onMouseEnter() {
    this.setState({ isHover: true });
  }
  onMouseLeave() {
    this.setState({ isHover: false });
  }
  setDropped(image) {
    this.props.onDrop(image.preview);
  }
  renderCameraIcon() {
    const { isHover } = this.state;
    return <CameraIcon size={50} color={isHover ? '#222' : '#888'} />;
  }
  render() {
    const { isCover, imageBlob } = this.props;
    const { onMouseEnter, onMouseLeave } = this;
    const containerConfig = {};
    if (imageBlob) {
      containerConfig.style = { backgroundImage: `url(${imageBlob})` };
    } else {
      containerConfig.onMouseEnter = onMouseEnter;
      containerConfig.onMouseLeave = onMouseLeave;
    }

    if (imageBlob) {
      return (
        <div styleName="imageDropped" {...containerConfig} >
          {isCover && <div styleName="coverLabel">封面</div>}
        </div>
      );
    }
    return (
      <div styleName="imageDropzone" {...containerConfig}>
        {
          !imageBlob &&
          <div styleName="cameraLabel">
            {this.renderCameraIcon()}
            {!isCover && <div styleName="noticeHelper">新增其他照片</div>}
          </div>
        }
        {isCover && <div styleName="coverLabel">封面</div>}
        {
          !imageBlob &&
          <Dropper onDrop={this.setDropped} />
        }
      </div>
    );
  }
}

export default Dropzone;
