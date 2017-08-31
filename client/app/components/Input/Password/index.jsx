import React from 'react';
import PropTypes from 'prop-types';
import myPropTypes from 'propTypes';
// import classnames from 'classnames/bind';
import hasError from 'components/Input/hoc/hasError';
import CSS from 'react-css-modules';
import styles from './styles.sass';

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
    onFocus: null,
    onEnter: null,
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
    onFocus: PropTypes.func,
    onEnter: PropTypes.func,
  };

  constructor(props) {
    super(props);

    this.onChange = this.onChange.bind(this);
    this.onKeyDown = this.onKeyDown.bind(this);
  }

  componentDidMount() {
    const { autoComplete } = this.props;
    if (autoComplete === 'off') {
      this.input.setAttribute('type', 'password');
    }
  }

  componentWillUnmount() {
    const { autoComplete } = this.props;
    if (autoComplete === 'off') {
      this.input.setAttribute('type', 'text');
    }
  }

  onChange(e) {
    this.props.onChange(e.target.value);
  }

  onKeyDown(e) {
    const { onEnter } = this.props;
    if (e.key === 'Enter' && onEnter) {
      onEnter();
    }
  }

  render() {
    const {
      autoComplete,
      align,
      placeholder,
      value,
      width,
      disabled,
      onBlur,
      onFocus,
    } = this.props;

    const style = { width, textAlign: align };

    return (
      <input
        ref={input => (this.input = input)}
        type={autoComplete === 'off' ? 'text' : 'password'}
        value={value}
        placeholder={placeholder}
        styleName="input"
        style={style}
        disabled={disabled}
        autoComplete={autoComplete}
        onFocus={onFocus}
        onBlur={onBlur}
        onKeyDown={this.onKeyDown}
        onChange={this.onChange}
      />
    );
  }
}
export default hasError(CSS(InputText, styles));
