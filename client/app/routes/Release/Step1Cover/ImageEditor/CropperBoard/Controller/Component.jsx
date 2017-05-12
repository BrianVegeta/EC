import React, { PropTypes } from 'react';
import RotateRightIcon from 'react-icons/lib/md/rotate-right';
import RotateLeftIcon from 'react-icons/lib/md/rotate-left';
import Slider from 'rc-slider';

class Controller extends React.Component {
  static propTypes = {
    zoom: PropTypes.func.isRequired,
  };
  constructor(props) {
    super(props);
    this.onSliderChange = this.onSliderChange.bind(this);
    this.sliderProps = {
      handleStyle: { marginTop: -11, width: 25, height: 25 },
      onChange: this.onSliderChange,
      max: 250,
      min: 0,
      step: 1,
    };
  }
  onSliderChange(value) {
    const ratio = value / this.sliderProps.max;
    this.props.zoom(ratio);
  }
  render() {
    return (
      <div styleName="container">
        <div styleName="sliderContainer">
          <Slider {...this.sliderProps} />
        </div>
      </div>
    );
  }
}

export default Controller;