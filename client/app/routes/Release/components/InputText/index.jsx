import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames/bind';
import CSS from 'react-css-modules';
import styles from './styles.sass';

const classbinding = classnames.bind(styles);
class InputText extends React.Component {
  static defaultProps = {
    type: 'text',
    disabled: false,
    placeholder: null,
    value: null,
    width: '100%',
    onBlur: null,
  };
  static propTypes = {
    type: PropTypes.string,
    disabled: PropTypes.bool,
    placeholder: PropTypes.string,
    onChange: PropTypes.func.isRequired,
    onBlur: PropTypes.func,
    value: PropTypes.string,
    width: PropTypes.oneOfType([
      PropTypes.string, PropTypes.number,
    ]).isRequired,
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
    const {
      type,
      placeholder,
      value,
      width,
      disabled,
    } = this.props;
    const { isFocusing } = this.state;

    const inputProps = {
      type,
      className: classbinding({ inputFocusing: isFocusing, input: !isFocusing }),
      style: { width },
      value,
      placeholder,
      onFocus: this.onFocus,
      onBlur: this.onBlur,
      onChange: this.onChange,
      disabled,
    };
    return (
      <input {...inputProps} />
    );
  }
}
export default CSS(InputText, styles);
