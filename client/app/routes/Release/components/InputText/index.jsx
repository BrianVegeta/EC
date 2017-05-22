// TODO: max min 0508
import React, { PropTypes } from 'react';
import CSS from 'react-css-modules';
import styles from './styles.sass';

class InputText extends React.Component {
  static defaultProps = {
    placeholder: null,
    value: null,
  };
  static propTypes = {
    placeholder: PropTypes.string,
    onChange: PropTypes.func.isRequired,
    value: PropTypes.string,
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
    this.setState({ isFocusing: false });
  }
  onFocus() {
    this.setState({ isFocusing: true });
  }
  onChange(e) {
    this.props.onChange(e.target.value);
  }
  render() {
    const { onFocus, onBlur, onChange } = this;
    const { placeholder, value } = this.props;
    const { isFocusing } = this.state;
    return (
      <input
        {...{
          ref: i => (this.input = i),
          styleName: isFocusing ? 'inputFocusing' : 'input',
          placeholder,
          onFocus,
          onBlur,
          onChange,
          value,
        }}
      />
    );
  }
}
export default CSS(InputText, styles);
