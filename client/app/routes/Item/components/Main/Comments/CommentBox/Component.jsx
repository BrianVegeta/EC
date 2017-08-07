import React, { PropTypes } from 'react';
// import { Editor, EditorState } from 'draft-js';
import Editable from 'react-plain-editable';

class Comment extends React.Component {

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

  onChange(e, value) {
    this.setState({
      value,
      html: this.textbox.innerHTML,
    });
  }

  onFocus() {
    this.setState({
      isFocusing: true,
      isControllerVisible: true,
      html: this.textbox.innerHTML,
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

  rController() {
    return (
      <div styleName="buttons">
        <button styleName="cancel" onClick={this.onBtnCancel}>
          取消
        </button>
        <button styleName="comment">
          留言
        </button>
      </div>
    );
  }

  render() {
    // TODO: commentbox
    const { isFocusing, isControllerVisible } = this.state;
    return (
      <div styleName="container">
        <div styleName="title">我要留言</div>
        <div styleName={isFocusing ? 'tb-container-focusing' : 'tb-container'}>
          <div styleName="textbox" ref={textbox => (this.textbox = textbox)}>
            <Editable
              value={this.isPlaceholding() ? this.placeholder : this.state.editorValue}
              styleName={this.isPlaceholding() ? 'editable-placeholding' : 'editable'}
              onChange={this.onChange}
              onFocus={this.onFocus}
              onBlur={this.onBlur}
            />
          </div>
        </div>
        <div styleName="controller">
          { isControllerVisible && this.rController() }
        </div>
      </div>
    );
  }
}

export default Comment;
