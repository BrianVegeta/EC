// <InputCurrency
//   unit=""
//   value=""
//   placeholder=""
//   width={}
//   onChange={}
//   onBlur={}
// />


import React, { PropTypes } from 'react';
import NumberFormat from 'react-number-format';
import _ from 'lodash';
import numeral from 'numeral';
import CSS from 'react-css-modules';
import styles from './styles.sass';

class InputCurrency extends React.Component {
  static defaultProps = {
    value: '',
    placeholder: null,
    width: null,
    onChange: null,
    onBlur: null,
    unit: 'NT$',
  };
  static propTypes = {
    unit: PropTypes.string,
    placeholder: PropTypes.string,
    value: PropTypes.string,
    width: PropTypes.number,
    onChange: PropTypes.func,
    onBlur: PropTypes.func,
  };
  static naturalizeValue(value) {
    const numbericValue = _.parseInt(value);
    return numeral(numbericValue).format('0,000');
  }
  constructor(props) {
    super(props);
    this.onBlur = this.onBlur.bind(this);
    this.onFocus = this.onFocus.bind(this);
    this.onChange = this.onChange.bind(this);
    this.format = this.format.bind(this);
    this.state = { isFocusing: false };
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
    const { onChange } = this.props;
    if (onChange) { onChange(value); }
  }
  format(value) {
    return this.constructor.naturalizeValue(value);
  }
  render() {
    const { unit, placeholder, value, width } = this.props;
    const outerStyleName = this.state.isFocusing ? 'inputOuterFocusing' : 'inputOuter';
    const numberFormatProps = {
      styleName: 'input',
      placeholder,
      value,
      onFocus: this.onFocus,
      onBlur: this.onBlur,
      onChange: this.onChange,
      format: this.format,
      allowNegative: false,
    };
    return (
      <div styleName={outerStyleName} style={{ width }} >
        <span styleName="unit">{unit}</span>
        <NumberFormat {...numberFormatProps} />
      </div>
    );
  }
}

export default CSS(InputCurrency, styles);
