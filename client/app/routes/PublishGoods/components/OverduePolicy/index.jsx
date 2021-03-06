import React from 'react';
import PropTypes from 'prop-types';
import CSS from 'react-css-modules';
import Slider from 'rc-slider';
import CheckBox from 'components/Input/CheckBox';
import styles from './styles.sass';
import SliderHandler from './SliderHandler';


class OverduePolicy extends React.Component {

  static defaultProps = {
    deposit: 0,
    enable: false,
    rate: 5,
  }

  static propTypes = {
    deposit: PropTypes.number.isRequired,
    onChange: PropTypes.func.isRequired,
    enable: PropTypes.bool,
    rate: PropTypes.number,
  };
  static calAmountPerDay(percentage, deposit) {
    return Math.ceil((deposit * percentage) / 100);
  }
  static calMaxsDaysOverdue(percentage) {
    return Math.ceil(100 / percentage);
  }
  constructor(props) {
    super(props);
    this.onActive = this.onActive.bind(this);
    this.onSliderChange = this.onSliderChange.bind(this);
    this.state = {
      isActivating: this.props.enable,
      percentage: this.props.rate,
    };
  }
  onActive(checked) {
    this.setState({ isActivating: checked });
    this.props.onChange({ hasOverduePolicy: checked });
  }
  onSliderChange(value) {
    this.slider.focus();
    this.setState({ percentage: value });
    this.props.onChange({ overdueRate: value });
  }
  renderControlPanel(sliderProps) {
    const { deposit } = this.props;
    const { percentage } = this.state;
    const { calAmountPerDay, calMaxsDaysOverdue } = this.constructor;
    const amountPerDay = calAmountPerDay(percentage, deposit);
    const overdueMaxDays = calMaxsDaysOverdue(percentage);
    return (
      <div styleName="controlPanel">
        <div
          styleName="slider"
          ref={slider => (this.slider = slider)}
          tabIndex="0"
        >
          <Slider {...sliderProps} />
        </div>
        <div styleName="calculated">
          一天約扣 <span styleName="number">{amountPerDay}</span> 元
          {amountPerDay > 0 &&
            <span>
              ，
              <span styleName="number">{overdueMaxDays}</span>
              天扣完
            </span>
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
      checked: this.state.isActivating,
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
        <CheckBox {...checkboxProps}>
          <span styleName="label">啟用逾期金政策</span>
        </CheckBox>
        {isActivating && this.renderControlPanel(sliderProps)}
      </div>
    );
  }
}

export default CSS(OverduePolicy, styles);
