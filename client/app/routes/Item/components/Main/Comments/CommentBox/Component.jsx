import React from 'react';
import PropTypes from 'prop-types';
// import { Editor, EditorState } from 'draft-js';
// import Editable from 'react-plain-editable';
import Textarea from 'components/inputs/Textarea';

class Comment extends React.Component {

  static propTypes = {
    dispatchAddMessage: PropTypes.func.isRequired,
  };

  constructor(props) {
    super(props);
    this.onChange = this.onChange.bind(this);
    this.onFocus = this.onFocus.bind(this);
    this.onBlur = this.onBlur.bind(this);
    this.onBtnCancel = this.onBtnCancel.bind(this);
    this.placeholder = '請輸入您想詢問的內容';
    this.state = {
      isControllerVisible: false,
      isFocusing: false,
      editorValue: ' ',
      value: '',
    };
  }

  onChange(value) {
    this.setState({ value });
  }

  onFocus() {
    this.setState({
      isFocusing: true,
      isControllerVisible: true,
      // html: this.textbox.innerHTML,
    });
  }

  onBlur(e, value) {
    this.setState({
      isFocusing: false,
      editorValue: this.isValueEmpty() ? ' ' : value,
    });
  }

  onBtnCancel() {
    this.setState({
      isControllerVisible: false,
      editorValue: ' ',
      value: '',
      html: this.textbox.innerHTML,
    });
  }

  isValueEmpty() {
    return this.state.value === '' || this.state.value === ' ';
  }

  isPlaceholding() {
    return this.isValueEmpty() && !this.state.isFocusing;
  }

  rController(dispatchAddMessage) {
    return (
      <div styleName="buttons">
        <button styleName="cancel" onClick={this.onBtnCancel}>
          取消
        </button>
        <button
          styleName="comment"
          onClick={() => dispatchAddMessage(this.state.value)}
        >
          留言
        </button>
      </div>
    );
  }

  render() {
    // TODO: commentbox
    const { isFocusing, isControllerVisible, dispatchAddMessage } = this.state;
    const refTextbox = textbox => (this.textbox = textbox);
    return (
      <div styleName="container">
        <div styleName="title">我要留言</div>
        <div>
          <Textarea
            {...{
              ref: refTextbox,
              value: this.state.value,
              placeholder: '',
              onChange: this.onChange,
              minHeight: 100,
            }}
          />
        </div>
        <div styleName="controller">
          { this.rController(this.props.dispatchAddMessage) }
        </div>
      </div>
    );
  }
}

export default Comment;
