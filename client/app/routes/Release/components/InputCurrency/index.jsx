// <InputCurrency
//   unit=""
//   value=""
//   placeholder=""
//   width={}
//   onChange={}
// />


import React, { PropTypes } from 'react';
import NumberFormat from 'react-number-format';
import CSS from 'react-css-modules';
import styles from './styles.sass';

class InputCurrency extends React.Component {
  static defaultProps = {
    value: '',
    placeholder: null,
    width: null,
    onChange: null,
    unit: 'NT$',
  };
  static propTypes = {
    unit: PropTypes.string,
    placeholder: PropTypes.string,
    value: PropTypes.string,
    width: PropTypes.number,
    onChange: PropTypes.func,
  };
  constructor(props) {
    super(props);
    this.onBlur = this.onBlur.bind(this);
    this.onFocus = this.onFocus.bind(this);
    this.onChange = this.onChange.bind(this);
    this.state = { isFocusing: false };
  }
  onBlur() {
    this.setState({ isFocusing: false });
  }
  onFocus() {
    this.setState({ isFocusing: true });
  }
  onChange(e, value) {
    const { onChange } = this.props;
    if (onChange) { onChange(value); }
  }
  render() {
    const { unit, placeholder, value, width } = this.props;
    const outerStyleName = this.state.isFocusing ? 'inputOuterFocusing' : 'inputOuter';
    return (
      <div styleName={outerStyleName} style={{ width }} >
        <span styleName="unit">{unit}</span>
        <NumberFormat
          styleName="input"
          placeholder={placeholder}
          onFocus={this.onFocus}
          onBlur={this.onBlur}
          onChange={this.onChange}
          value={value}
          thousandSeparator
        />
      </div>
    );
  }
}

export default CSS(InputCurrency, styles);
