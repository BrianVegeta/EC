import React, { PropTypes } from 'react';
import Slider from 'rc-slider';

class Controller extends React.Component {
  static propTypes = {
    zoomTo: PropTypes.func.isRequired,
    onCancel: PropTypes.func.isRequired,
    onDone: PropTypes.func.isRequired,
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
    this.props.zoomTo(ratio);
  }
  render() {
    return (
      <div styleName="container" className="clear">
        <span styleName="sliderText">縮放</span>
        <div styleName="sliderContainer">
          <Slider {...this.sliderProps} />
        </div>
        <div styleName="btnGroups">
          <button
            className="button"
            styleName="cancelBtn"
            onClick={() => this.props.onCancel()}
          >
            取消
          </button>
          <button
            className="button"
            styleName="doneBtn"
            onClick={() => this.props.onDone()}
          >
            完成
          </button>
        </div>
      </div>
    );
  }
}

export default Controller;
