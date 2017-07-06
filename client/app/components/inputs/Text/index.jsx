// <InputText
//   placeholder="詳細地址"
//   value={address}
//   onChange={model.onAddressChange}
// />
import React from 'react';
import PropTypes from 'prop-types';
import myPropTypes from 'propTypes';
import classnames from 'classnames/bind';
import hasError from 'components/inputs/hoc/hasError';
import CSS from 'react-css-modules';
import styles from './styles.sass';

const cx = classnames.bind(styles);
class InputText extends React.Component {
  static defaultProps = {
    disabled: false,
    placeholder: null,
    value: null,
    width: '100%',
    onChange: null,
    onBlur: null, // need for validator
  };
  static propTypes = {
    disabled: PropTypes.bool,
    placeholder: PropTypes.string,
    value: PropTypes.string,
    width: myPropTypes.width,
    onChange: PropTypes.func,
    onBlur: PropTypes.func, // need for validator
  };
  constructor(props) {
    super(props);
    this.onBlur = this.onBlur.bind(this);
    this.onFocus = this.onFocus.bind(this);
    this.onChange = this.onChange.bind(this);
    this.state = {
      isFocusing: false,
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
  onChange(e) {
    this.props.onChange(e.target.value);
  }
  render() {
    const { placeholder, value, width, disabled } = this.props;
    const { isFocusing } = this.state;
    const inputProps = {
      className: cx('input', { isFocusing }),
      onFocus: this.onFocus,
      onBlur: this.onBlur,
      onChange: this.onChange,
      placeholder,
      style: { width },
      value,
      disabled,
    };
    return (
      <input {...inputProps} />
    );
  }
}
export default hasError(CSS(InputText, styles));
