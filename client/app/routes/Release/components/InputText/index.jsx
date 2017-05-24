// TODO: max min 0508
// ex: <InputText placeholder="請輸入" value="" onChange={} width={100} />
import React, { PropTypes } from 'react';
import CSS from 'react-css-modules';
import styles from './styles.sass';

class InputText extends React.Component {
  static defaultProps = {
    placeholder: null,
    value: null,
    width: '100%',
  };
  static propTypes = {
    placeholder: PropTypes.string,
    onChange: PropTypes.func.isRequired,
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
    const { placeholder, value, width } = this.props;
    const { isFocusing } = this.state;
    return (
      <input
        {...{
          styleName: isFocusing ? 'inputFocusing' : 'input',
          style: { width },
          placeholder,
          value,
          onFocus,
          onBlur,
          onChange,
        }}
      />
    );
  }
}
export default CSS(InputText, styles);
