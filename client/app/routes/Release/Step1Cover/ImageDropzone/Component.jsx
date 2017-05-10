import React, { PropTypes } from 'react';
import CameraIcon from 'react-icons/lib/ti/camera-outline';
import EditIcon from 'react-icons/lib/md/edit';
import RemoveIcon from 'react-icons/lib/go/trashcan';
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
    const { isCover, imageBlob, containerClass } = this.props;
    const { onMouseEnter, onMouseLeave } = this;
    const containerConfig = {
      className: containerClass,
      onMouseEnter,
      onMouseLeave,
    };
    if (imageBlob) {
      return (
        <div
          styleName="imageDropped"
          style={{ backgroundImage: `url(${imageBlob})` }}
          {...containerConfig}
        >
          <div styleName="controller">
            <span
              styleName="controlIcon"
            >
              <EditIcon size={16} color="#fff" style={{ display: 'block' }} />
            </span>
            <span
              styleName="controlIcon"
            >
              <RemoveIcon size={16} color="#fff" style={{ display: 'block' }} />
            </span>
          </div>
          {isCover && <div styleName="coverLabel">封面</div>}
        </div>
      );
    }
    return (
      <div styleName="imageDropzone" {...containerConfig}>
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
