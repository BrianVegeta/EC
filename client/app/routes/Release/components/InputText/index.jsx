import React, { PropTypes } from 'react';
import classnames from 'classnames/bind';
import CSS from 'react-css-modules';
import styles from './styles.sass';

const classbinding = classnames.bind(styles);
class InputText extends React.Component {
  static defaultProps = {
    placeholder: null,
    value: null,
    width: '100%',
    onBlur: null,
  };
  static propTypes = {
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
    const { placeholder, value, width } = this.props;
    const { isFocusing } = this.state;
    const inputProps = {
      className: classbinding({ inputFocusing: isFocusing, input: !isFocusing }),
      style: { width },
      value,
      placeholder,
      onFocus: this.onFocus,
      onBlur: this.onBlur,
      onChange: this.onChange,
    };
    return (
      <input {...inputProps} />
    );
  }
}
export default CSS(InputText, styles);
