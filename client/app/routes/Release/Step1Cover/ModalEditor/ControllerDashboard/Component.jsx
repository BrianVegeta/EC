import React, { PropTypes } from 'react';
import RotateRightIcon from 'react-icons/lib/md/rotate-right';
import RotateLeftIcon from 'react-icons/lib/md/rotate-left';
import CropIcon from 'react-icons/lib/md/crop-free';

class Controller extends React.Component {
  static propTypes = {
    rotate: PropTypes.func.isRequired,
    toCrop: PropTypes.func.isRequired,
    onComplete: PropTypes.func.isRequired,
  };
  constructor(props) {
    super(props);
    this.onRightRotate = this.onRightRotate.bind(this);
    this.onLeftRotate = this.onLeftRotate.bind(this);
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
          onClick={this.onRightRotate}
        >
          <RotateRightIcon size={30} />
          <span styleName="text">右旋轉</span>
        </button>
        <button
          className="button"
          styleName="cropBtn"
          onClick={this.props.toCrop}
        >
          <CropIcon size={25} />
          <span styleName="text">裁切</span>
        </button>
        <button
          className="button"
          styleName="saveBtn"
          onClick={this.props.onComplete}
        >
          儲存變更
        </button>
      </div>
    );
  }
}

export default Controller;
