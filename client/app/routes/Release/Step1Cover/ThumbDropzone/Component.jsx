import React, { PropTypes } from 'react';
import CameraIcon from 'react-icons/lib/ti/camera-outline';
import Dropper from './Dropper';

class Dropzone extends React.Component {
  static defaultProps = {
    coverLabel: false,
  };
  static propTypes = {
    coverLabel: PropTypes.node,
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
  render() {
    const { coverLabel } = this.props;
    const { onMouseEnter, onMouseLeave } = this;
    return (
      <div
        styleName="imageDropzone"
        {...{ onMouseEnter, onMouseLeave }}
      >
        <div styleName="cameraLabel">
          <CameraIcon
            size={50}
            color={this.state.isHover ? '#222' : '#888'}
          />
          {!coverLabel && <div styleName="noticeHelper">新增其他照片</div>}
        </div>
        {coverLabel}
        <Dropper onDrop={this.setDropped} />
      </div>
    );
  }
}

export default Dropzone;
