import React, { PropTypes } from 'react';
import RotateRightIcon from 'react-icons/lib/md/rotate-right';
import RotateLeftIcon from 'react-icons/lib/md/rotate-left';
import CropIcon from 'react-icons/lib/md/crop-free';

class Controller extends React.Component {
  static propTypes = {
    rotate: PropTypes.func.isRequired,
  };
  constructor(props) {
    super(props);
    this.onRightRotate = this.onRightRotate.bind(this);
    this.onLeftRotate = this.onLeftRotate.bind(this);
    this.onEnterCropping = this.onEnterCropping.bind(this);
  }
  onEnterCropping() {
    this.props.enterCroping();
  }
  onRightRotate() {
    this.props.rotate('right');
  }
  onLeftRotate() {
    this.props.rotate('left');
  }
  render() {
    return (
      <div styleName="container">
        <button
          className="button"
          styleName="rotateBtn"
          onClick={this.onLeftRotate}
        >
          <RotateLeftIcon size={30} />
          <span styleName="text">左旋轉</span>
        </button>
        <button
          className="button"
          styleName="rotateBtn"
          onClick={this.onLeftRotate}
        >
          <RotateRightIcon size={30} />
          <span styleName="text">右旋轉</span>
        </button>
        <button
          className="button"
          styleName="cropBtn"
          onClick={this.onEnterCropping}
        >
          <CropIcon size={25} />
          <span styleName="text">裁切</span>
        </button>
        <button
          className="button"
          styleName="saveBtn"
        >
          儲存變更
        </button>
      </div>
    );
  }
}

export default Controller;
