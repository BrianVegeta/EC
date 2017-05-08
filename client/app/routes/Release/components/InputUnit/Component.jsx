// TODO: max min 0508
import React, { PropTypes } from 'react';
import NumberFormat from 'react-number-format';

class InputUnit extends React.Component {

  static defaultProps = {
    placeholder: null,
    value: null,
    suffix: null,
  };

  static propTypes = {
    placeholder: PropTypes.string,
    value: PropTypes.number,
    suffix: PropTypes.string,
  };

  constructor(props) {
    super(props);
    this.onBlur = this.onBlur.bind(this);
    this.onFocus = this.onFocus.bind(this);
    this.onChange = this.onChange.bind(this);
    this.state = {
      isFocusing: false,
      value: this.props.value,
    };
  }

  onBlur() {
    this.setState({ isFocusing: false });
  }

  onFocus() {
    this.setState({ isFocusing: true });
  }

  onChange(e, value) {
    this.setState({ value });
  }

  render() {
    return (
      <div styleName={this.state.isFocusing ? 'inputFocusing' : 'input'}>
        <NumberFormat
          ref={i => (this.input = i)}
          styleName="inputInner"
          placeholder={this.props.placeholder}
          onFocus={this.onFocus}
          onBlur={this.onBlur}
          onChange={this.onChange}
          value={this.state.value}
          suffix={this.props.suffix}
        />
      </div>
    );
  }
}

export default InputUnit;
