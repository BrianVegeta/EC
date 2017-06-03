// <InputUnit
//   value={1}
//   suffix="天" max={100} min={1}
//   width={150}
//   onChange={func}
//   placeholder="Enter..."
// />

import React, { PropTypes } from 'react';
import NumberFormat from 'react-number-format';
import _ from 'lodash';
import CSS from 'react-css-modules';
import styles from './styles.sass';

class InputUnit extends React.Component {
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
    this.format = this.format.bind(this);
    this.state = {
      isFocusing: false,
      value: this.props.value,
    };
  }
  onBlur() {
    const { onBlur } = this.props;
    if (onBlur) {
      onBlur();
    }
    this.setState({ isFocusing: false });
  }
  onFocus() {
    this.setState({ isFocusing: true });
  }
  onChange(e, value) {
    this.setState({ value });
    const { onChange } = this.props;
    const number = _.isEmpty(value) ? null : _.parseInt(value);
    if (!onChange) { return; }
    onChange(number);
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
      </div>
    );
  }
}

export default CSS(InputUnit, styles);
