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
import classnames from 'classnames/bind';
import _ from 'lodash';
import numeral from 'numeral';
import CSS from 'react-css-modules';
import styles from './styles.sass';

const classbind = classnames.bind(styles);
class InputCurrency extends React.Component {
  static defaultProps = {
    unit: 'NT$',
    placeholder: null,
    value: '',
    width: null,
    onChange: null,
    onBlur: null,
  };
  static propTypes = {
    unit: PropTypes.string,
    placeholder: PropTypes.string,
    value: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
    width: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
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
    const { isFocusing } = this.state;
    const inputOuterClass = classbind({
      inputOuterFocusing: isFocusing,
      inputOuter: !isFocusing,
    });
    const unitClass = classbind('unit');
    const inputClass = classbind('input');
    const numformatProps = {
      placeholder,
      value,
      onFocus: this.onFocus,
      onBlur: this.onBlur,
      onChange: this.onChange,
      format: this.format,
      allowNegative: false,
    };
    return (
      <div className={inputOuterClass} style={{ width }} >
        <span className={unitClass}>{unit}</span>
        <NumberFormat className={inputClass} {...numformatProps} />
      </div>
    );
  }
}

export default CSS(InputCurrency, styles);
