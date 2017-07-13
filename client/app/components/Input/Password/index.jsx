import React from 'react';
import PropTypes from 'prop-types';
import myPropTypes from 'propTypes';
import classnames from 'classnames/bind';
// import hasError from 'components/inputs/hoc/hasError';
import CSS from 'react-css-modules';
import styles from './styles.sass';

const cx = classnames.bind(styles);
class InputText extends React.Component {

  static defaultProps = {
    autoComplete: 'on',
    align: 'left',
    disabled: false,
    placeholder: null,
    value: null,
    width: '100%',
    onChange: null,
    onBlur: null, // need for validator
  };

  static propTypes = {
    autoComplete: PropTypes.oneOf(['on', 'off']),
    align: PropTypes.string,
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
    if (this.props.autoComplete === 'off') {
      this.input.setAttribute('type', 'password');
    }
    this.setState({ isFocusing: true });
  }

  onChange(e) {
    this.props.onChange(e.target.value);
  }

  render() {
    const {
      autoComplete,
      align,
      placeholder,
      value,
      width,
      disabled,
    } = this.props;

    const { isFocusing } = this.state;
    const inputProps = {
      ref: input => (this.input = input),
      type: autoComplete === 'off' ? 'text' : 'password',
      autoComplete,
      className: cx('input', { isFocusing }),
      onFocus: this.onFocus,
      onBlur: this.onBlur,
      onChange: this.onChange,
      placeholder,
      style: { width, textAlign: align },
      value,
      disabled,
    };

    return (
      <input {...inputProps} />
    );
  }
}
export default CSS(InputText, styles);
