import React from 'react';
import PropTypes from 'prop-types';
import TextareaAutosize from 'react-autosize-textarea';
import CSS from 'react-css-modules';
import styles from './styles.sass';


class InputBox extends React.Component {

  static propTypes = {
    input: PropTypes.string.isRequired,
    changeInput: PropTypes.func.isRequired,
    sendMessage: PropTypes.func.isRequired,
  };

  constructor(props) {
    super(props);
    this.onEnter = this.onEnter.bind(this);
    this.onInputChange = this.onInputChange.bind(this);
  }

  onInputChange(e) {
    this.props.changeInput(e.target.value);
  }

  onEnter(e) {
    if (!e.shiftKey && e.key === 'Enter' && e.keyCode !== 229) {
      e.preventDefault();
      this.props.sendMessage();
    }
  }

  render() {
    const { input } = this.props;
    return (
      <div styleName="container">
        <div styleName="input">
          <TextareaAutosize
            styleName="input-text-area"
            value={input}
            onChange={this.onInputChange}
            onKeyDown={this.onEnter}
          />
        </div>
        <div styleName="controllers">
          <button
            className="button"
            styleName="button"
          >
            照片
          </button>
          <button
            className="button"
            styleName="button"
          >
            商品
          </button>
          <button
            className="button"
            styleName="button"
          >
            發佈
          </button>
          <button
            className="button"
            styleName="submit-button"
          >
            送出
          </button>
        </div>
      </div>
    );
  }
}

export default CSS(InputBox, styles);
