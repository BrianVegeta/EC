import React, { PropTypes } from 'react';
import Numberic from 'react-numeric-input';
import styles from './styles.sass';

class Number extends React.Component {

  static defaultProps = {
    placeholder: null,
  };

  static propTypes = {
    placeholder: PropTypes.string,
    value: PropTypes.string.isRequired,
  };

  constructor(props) {
    super(props);
    this.onBlur = this.onBlur.bind(this);
    this.onFocus = this.onFocus.bind(this);
    this.onInputChange = this.onInputChange.bind(this);
    this.state = {
      isFocusing: false,
      value: 0,
    };
  }

  onBlur() {
    this.setState({ isFocusing: false });
  }

  onFocus() {
    this.setState({ isFocusing: true });
  }

  onInputChange() {
    const input = this.input;
    console.log(input.refs.input.getValueAsNumber());
  }

  render() {
    return (
      <div styleName={this.state.isFocusing ? 'inputFocusing' : 'input'}>
        <Numberic
          ref={i => (this.input = i)}
          className={`${styles.inputInner} form-control`}
          value={this.state.value}
          onChange={this.onInputChange}
          max={30}
          style={{
            wrap: {
              height: '100%',
              width: '100%',
            },
            input: {
              paddingRight: 44,
            },
            btn: {
              display: 'inline-block',
              background: '#fff',
              width: 40,
            },
            btnUp: {
              borderRadius: 2,
              borderWidth: 2,
              boxShadow: 'none',
            },
            btnDown: {
              borderRadius: 2,
              borderWidth: 2,
              boxShadow: 'none',
            },
          }}
        />
      </div>
    );
  }
}

export default Number;
