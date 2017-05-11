import React, { PropTypes } from 'react';
import RotateRightIcon from 'react-icons/lib/md/rotate-right';
import RotateLeftIcon from 'react-icons/lib/md/rotate-left';
import Slider from 'rc-slider';

class Controller extends React.Component {
  render() {
    return (
      <div styleName="container">
        <button styleName="rotateBtn" className="button">
          <RotateLeftIcon size={30} />
        </button>
        <button styleName="rotateBtn" className="button">
          <RotateRightIcon size={30} />
        </button>
        <div styleName="sliderContainer">
          <Slider handleStyle={{ marginTop: -11, width: 25, height: 25 }} />
        </div>
      </div>
    );
  }
}

export default Controller;
