// <InputCounter
//   value={1}
//   suffix="天"
//   max={}
//   min={}
//   width={}
//   onChange={}
//   onBlur={}
// />
// ps. need allow null


import React, { PropTypes } from 'react';
import NumberFormat from 'react-number-format';
import _ from 'lodash';
import IconDown from 'react-icons/lib/md/keyboard-arrow-down';
import IconUp from 'react-icons/lib/md/keyboard-arrow-up';
import CSS from 'react-css-modules';
import styles from './styles.sass';

class InputCounter extends React.Component {
  static defaultProps = {
    placeholder: null,
    value: null,
    suffix: null,
    onChange: null,
    onBlur: null,
    width: null,
    max: 30,
    min: 1,
  };
  static propTypes = {
    placeholder: PropTypes.string,
    value: PropTypes.number,
    suffix: PropTypes.string,
    onChange: PropTypes.func,
    onBlur: PropTypes.func,
    width: PropTypes.number,
    max: PropTypes.number,
    min: PropTypes.number,
  };
  constructor(props) {
    super(props);
    this.onBlur = this.onBlur.bind(this);
    this.onFocus = this.onFocus.bind(this);
    this.onChange = this.onChange.bind(this);
    this.onCounterUp = this.onCounterUp.bind(this);
    this.onCounterDown = this.onCounterDown.bind(this);
    this.format = this.format.bind(this);
    this.state = {
      isFocusing: false,
      value: this.props.value,
    };
  }
  onBlur() {
    const { onBlur } = this.props;
    if (onBlur) { onBlur(); }
    this.setState({ isFocusing: false });
  }
  onFocus() {
    this.setState({ isFocusing: true });
  }
  onChange(e, value) {
    this.setState({ value });
    const number = _.isEmpty(value) ? null : _.parseInt(value);
    this.dispatchOnChange(number);
  }
  onCounterUp() {
    const { value } = this.state;
    const number = value ? (_.parseInt(value) + 1) : 1;
    this.setState({ value: this.valueRanged(number) });
    this.dispatchOnChange(this.valueRanged(number));
  }
  onCounterDown() {
    const { value } = this.state;
    const number = value ? _.parseInt(value) - 1 : 0;
    this.setState({ value: this.valueRanged(number) });
    this.dispatchOnChange(this.valueRanged(number));
  }
  dispatchOnChange(number) {
    const { onChange } = this.props;
    if (onChange) onChange(number);
  }
  valueRanged(value) {
    const number = _.parseInt(value);
    const { max, min } = this.props;
    if (max && number > max) { return max.toString(); }
    if (min && number < min) { return min.toString(); }
    return value;
  }
  format(value) {
    return `${this.valueRanged(value)}${this.props.suffix}`;
  }
  checkDisabled(limit) {
    return (limit && this.state.value >= limit);
  }
  isUpDisable() {
    const { max } = this.props;
    return max && this.state.value >= max;
  }
  isDownDisable() {
    const { min } = this.props;
    const { value } = this.state;
    return _.isNull(value) || (min && value <= min);
  }
  render() {
    const { width, placeholder, suffix } = this.props;
    const { value, isFocusing } = this.state;
    const numberFormatConf = {
      value,
      suffix,
      placeholder,
      onFocus: this.onFocus,
      onBlur: this.onBlur,
      onChange: this.onChange,
      allowNegative: false,
      decimalSeparator: false,
      format: this.format,
    };
    return (
      <div
        styleName={isFocusing ? 'inputOuterFocusing' : 'inputOuter'}
        style={{ width }}
      >
        <NumberFormat styleName="input" {...numberFormatConf} />
        <div styleName="controller">
          <button
            className="button"
            styleName="up"
            onClick={this.onCounterUp}
            disabled={this.isUpDisable()}
          >
            <IconUp size={22} color="#fff" />
          </button>
          <button
            className="button"
            styleName="down"
            onClick={this.onCounterDown}
            disabled={this.isDownDisable()}
          >
            <IconDown size={22} color="#fff" />
          </button>
        </div>
      </div>
    );
  }
}

export default CSS(InputCounter, styles);
