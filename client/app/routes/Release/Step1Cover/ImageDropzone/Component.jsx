import React, { PropTypes } from 'react';
import CameraIcon from 'react-icons/lib/ti/camera-outline';
import Dropper from './Dropper';

class Dropzone extends React.Component {
  static defaultProps = {
    isCover: false,
    containerClass: null,
    imageBlob: null,
  };
  static propTypes = {
    isCover: PropTypes.bool,
    containerClass: PropTypes.string,
    imageBlob: PropTypes.string,
    onDrop: PropTypes.func.isRequired,
  };
  constructor(props) {
    super(props);
    this.onMouseEnter = this.onMouseEnter.bind(this);
    this.onMouseLeave = this.onMouseLeave.bind(this);
    this.setDropped = this.setDropped.bind(this);
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
    const { isCover } = this.props;
    const { imageBlob } = this.props;
    if (imageBlob) {
      return (
        <div
          style={{ backgroundImage: `url(${imageBlob})` }}
          styleName="imageDropped"
          className={this.props.containerClass}
        >
          {isCover && <div styleName="coverLabel">封面</div>}
        </div>
      );
    }
    return (
      <div
        styleName="imageDropzone"
        className={this.props.containerClass}
        onMouseEnter={this.onMouseEnter}
        onMouseLeave={this.onMouseLeave}
      >
        <div styleName="cameraLabel">
          {this.renderCameraIcon()}
          {!isCover && <div styleName="noticeHelper">新增其他照片</div>}
        </div>
        {isCover && <div styleName="coverLabel">封面</div>}
        <Dropper onDrop={this.setDropped} />
      </div>
    );
  }
}

export default Dropzone;
