import React from 'react';
import PropTypes from 'prop-types';
import CSS from 'react-css-modules';
import Slider from 'rc-slider';
import styles from './styles.sass';
import SliderHandler from './SliderHandler';
import InputCheckbox from '../InputCheckbox';

class OverduePolicy extends React.Component {
  static propTypes = {
    deposit: PropTypes.number.isRequired,
  };
  constructor(props) {
    super(props);
    this.onActive = this.onActive.bind(this);
    this.onSliderChange = this.onSliderChange.bind(this);
    this.state = {
      isActivating: false,
      percentage: 5,
    };
  }
  onActive(checked) {
    this.setState({ isActivating: checked });
  }
  onSliderChange(value) {
    this.setState({ percentage: value });
  }
  calculateAmountPerDay() {
    const { deposit } = this.props;
    const { percentage } = this.state;
    return Math.ceil((deposit * percentage) / 100);
  }
  calculateMaxDaysFromOverdue() {
    const { percentage } = this.state;
    return Math.ceil(100 / percentage);
  }
  renderControlPanel(sliderProps) {
    const amountPerDay = this.calculateAmountPerDay();
    const overdueMaxDays = this.calculateMaxDaysFromOverdue();
    return (
      <div styleName="controlPanel">
        <div styleName="slider">
          <Slider {...sliderProps} />
        </div>
        <div styleName="calculated">
          一天約扣 <span styleName="number">{amountPerDay}</span> 元
          {amountPerDay > 0 &&
            <span>，<span styleName="number">{overdueMaxDays}</span> 天扣完</span>
          }
        </div>
      </div>
    );
  }
  render() {
    const { isActivating, percentage } = this.state;
    const labelHelper = (
      <span className={styles.labelHelper}>
        逾期金是從押金裡面扣除，依照逾期天數累加算，扣完為止。
      </span>
    );
    const checkboxProps = {
      onChange: this.onActive,
      helper: labelHelper,
      checked: isActivating,
    };
    const sliderProps = {
      min: 5,
      max: 100,
      step: 5,
      defaultValue: percentage,
      handle: SliderHandler,
      onChange: this.onSliderChange,
    };
    return (
      <div styleName="container">
        <InputCheckbox {...checkboxProps}>
          <span styleName="label">啟用逾期金政策</span>
        </InputCheckbox>
        {isActivating && this.renderControlPanel(sliderProps)}
      </div>
    );
  }
}

export default CSS(OverduePolicy, styles);
