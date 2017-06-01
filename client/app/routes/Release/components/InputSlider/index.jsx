import React, { PropTypes } from 'react';
import Slider from 'rc-slider';

import Handler from './Handler';

class InputSlider extends React.Component {
  render() {
    return (
      <Slider min={5} max={100} defaultValue={5} step={5} handle={Handler} />
    );
  }
}

export default InputSlider;
