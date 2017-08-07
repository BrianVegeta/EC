import React, { PropTypes } from 'react';
import { Scrollbars } from 'react-custom-scrollbars';
import CommentRow from './CommentRow';

class PublicComment extends React.Component {

  static rScrollBar({ style, ...props }) {
    const thumbStyle = { backgroundColor: 'rgb(78, 76, 76)' };
    return <div style={{ ...style, ...thumbStyle }} {...props} />;
  }

  constructor(props) {
    super(props);
    this.state = {
      comments: [1, 2, 3, 4],
      scrollBoxHeight: null,
      isScrollHover: false,
      scrollTop: 0,
    };
    this.onLoadMore = this.onLoadMore.bind(this);
    this.onScrollerWheel = this.onScrollerWheel.bind(this);
    this.onEnterScrolling = this.onEnterScrolling.bind(this);
    this.onLeaveScrolling = this.onLeaveScrolling.bind(this);
    this.onScrollbarUpdate = this.onScrollbarUpdate.bind(this);
  }

  componentDidMount() {
    this.onMount(this.scroller.clientHeight);
  }

  onMount(scrollBoxHeight) {
    this.setState({ scrollBoxHeight });
  }

  onLoadMore() {
    const length = this.state.comments.length + 1;
    const comments = this.state.comments.concat([length + 1, length + 2, length + 3, length + 4]);
    this.setState({ comments });
  }

  onScrollerWheel(e) {
    // TODO: Browser issue?
    const { scrollBoxHeight, scrollTop } = this.state;
    const scrollerHeight = this.scroller.clientHeight;
    if (scrollBoxHeight === scrollerHeight) {
      return;
    }
    if (e.deltaY < 0 && scrollTop === 0) {
      e.preventDefault();
      return;
    }
    if (e.deltaY > 0 && scrollTop === 1) {
      e.preventDefault();
    }
  }

  onEnterScrolling() {
    this.setState({ isScrollHover: true });
  }

  onLeaveScrolling() {
    this.setState({ isScrollHover: false });
  }

  onScrollbarUpdate(values) {
    const { top } = values;
    this.setState({ scrollTop: top });
  }

  render() {
    const { scrollBoxHeight, comments, isScrollHover } = this.state;
    const { rScrollBar } = this.constructor;
    return (
      <div styleName="container">
        <h2 styleName="title">公開留言 | 86則</h2>
        <div styleName="box-border">
          <Scrollbars
            onUpdate={this.onScrollbarUpdate}
            renderThumbHorizontal={rScrollBar}
            renderThumbVertical={rScrollBar}

            styleName={isScrollHover ? 'scrolling-box' : 'scroll-box'}
            style={{ height: scrollBoxHeight }}

            onMouseEnter={this.onEnterScrolling}
            onMouseLeave={this.onLeaveScrolling}
          >
            <div styleName="scroll-outer" onWheel={this.onScrollerWheel} >
              <div styleName="scroll-inner" ref={n => (this.scroller = n)} >
                {comments.map(n => <CommentRow key={n} />)}
                <div styleName="comment-row-more">
                  <button styleName="more-btn" onClick={this.onLoadMore}>
                    查看更多留言
                  </button>
                </div>
              </div>
            </div>
          </Scrollbars>
        </div>
      </div>
    );
  }
}
export default PublicComment;
