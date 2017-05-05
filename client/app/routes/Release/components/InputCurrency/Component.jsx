import React, { PropTypes } from 'react';
import NumberFormat from 'react-number-format';

class InputCurrency extends React.Component {

  static defaultProps = {
    placeholder: null,
  };

  static propTypes = {
    unit: PropTypes.string.isRequired,
    placeholder: PropTypes.string,
    value: PropTypes.string.isRequired,
  };

  constructor(props) {
    super(props);
    this.onBlur = this.onBlur.bind(this);
    this.onFocus = this.onFocus.bind(this);
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

  render() {
    return (
      <div styleName={this.state.isFocusing ? 'inputFocusing' : 'input'}>
        <span
          styleName="unit"
          {...{
            role: 'button',
            onClick: () => this.input.focus(),
          }}
        >
          {this.props.unit}
        </span>
        <NumberFormat
          ref={i => (this.input = i)}
          styleName="inputInner"
          placeholder={this.props.placeholder}
          onFocus={this.onFocus}
          onBlur={this.onBlur}
          thousandSeparator
        />
      </div>
    );
  }
}

export default InputCurrency;
