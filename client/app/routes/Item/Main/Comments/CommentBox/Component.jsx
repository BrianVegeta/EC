import React, { PropTypes } from 'react';
import Scrollable from 'react-custom-scrollbars';

const editor = {
  lineHeight: 20,
  paddingTop: 20,
  paddingBottom: 20,
  visibleLines: 3,
};
class CommentBox extends React.Component {

  constructor(props) {
    super(props);
    this.onBreakLine = this.onBreakLine.bind(this);
    this.onKeyUp = this.onKeyUp.bind(this);
    this.test = this.test.bind(this);
    this.onKeyDown = this.onKeyDown.bind(this);
    this.onUpdate = this.onUpdate.bind(this);
    this.state = {
      scrollerHeight: 60,
    };
  }

  rScrollThumb() {
    const thumbStyle = {
      backgroundColor: '#222',
      width: 10,
    };
    return (
      <div style={{ ...thumbStyle }} />
    );
  }

  componentDidUpdate(prevProps, prevState) {
    if (this.state.scrollerHeight !== prevState.scrollerHeight) {
      
    }
  }

  onUpdate(values) {
    console.log(values)
  }

  onKeyUp(e) {

  }

  onKeyDown() {
    const { scrollerHeight } = this.state;
    if (scrollerHeight !== this.editable.clientHeight && this.editable.clientHeight <= 100) {
      console.log(this.editable.clientHeight);
      this.setState({ scrollerHeight: this.editable.clientHeight });
    }

    if (scrollerHeight !== this.editable.clientHeight) {
      this.scrollable.scrollToBottom();
    }
  }

  onBreakLine(e) {
    if (e.key === 'Enter') {
      console.log('enter');
      this.scrollable.scrollToBottom();
    } else {
      console.log('none');
    }
  }

  test() {
    this.scrollable.scrollToBottom();
  }

  render() {
    return (
      <div styleName="container">
        <div styleName="title">我要留言</div>
        <div styleName="input-scrollable">
          <Scrollable
            renderThumbVertical={this.rScrollThumb}
            style={{ height: this.state.scrollerHeight }}
            onUpdate={this.onUpdate}
            ref={scrollable => (this.scrollable = scrollable)}
          >
            <div>
              <div
                styleName="input-box"
                contentEditable
                onKeyUp={this.onKeyUp}
                onKeyDown={this.onKeyDown}
                role="presentation"
                ref={editable => (this.editable = editable)}
              />
            </div>
          </Scrollable>
        </div>
        <div styleName="controller">
          <button styleName="cancel" onClick={this.test}>取消</button>
          <button styleName="send">留言</button>
        </div>
      </div>
    );
  }
}

export default CommentBox;
