import React, { PropTypes } from 'react';

class PublicComment extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      comments: [1, 2, 3, 4],
      scrollBoxHeight: null,
      isScrollHover: false,
    };
    this.onLoadMore = this.onLoadMore.bind(this);
    this.onScrollerWheel = this.onScrollerWheel.bind(this);
    this.onEnterScrolling = this.onEnterScrolling.bind(this);
    this.onLeaveScrolling = this.onLeaveScrolling.bind(this);
  }

  componentDidMount() {
    // const style = window.getComputedStyle(this.scroller);
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
    const scrollBoxTop = this.scrollOuter.scrollTop;
    const { scrollBoxHeight } = this.state;
    const scrollerHeight = this.scroller.clientHeight;

    if (scrollBoxHeight === scrollerHeight) {
      return;
    }
    if (e.deltaY < 0 && scrollBoxTop === 0) {
      e.preventDefault();
      return;
    }
    if (e.deltaY > 0 && (scrollBoxTop + scrollBoxHeight) >= scrollerHeight) {
      e.preventDefault();
    }
  }

  rCommentInner() {
    return (
      <div styleName="comment-inner">
        <div styleName="avatar" />
        <div styleName="content-wrapper">
          <div styleName="header">
            <span styleName="name">陳小明</span>
            <span styleName="relative-time">23分鐘前</span>
          </div>
          <div styleName="content">
            有沒有更清楚的規格可以看？
            有沒有更清楚的規格可以看？
            有沒有更清楚的規格可以看？有沒有更清楚的規格可以看？
            有沒有更清楚的規格可以看？有沒有更清楚的規格可以看？有沒有更清楚的 ...顯示更多
          </div>
        </div>
      </div>
    );
  }

  onEnterScrolling() {
    console.log('scrolling');
    this.setState({ isScrollHover: true });
  }

  onLeaveScrolling() {
    console.log('leave scrolling');
    this.setState({ isScrollHover: false });
  }

  render() {
    const { scrollBoxHeight, comments, isScrollHover } = this.state;
    return (
      <div styleName="container">
        <h2 styleName="title">公開留言 | 86則</h2>
        <div styleName="box-border">
          <div
            styleName={isScrollHover ? 'scrolling-box' : 'scroll-box'}
            style={{ height: scrollBoxHeight }}
            ref={box => (this.scrollBox = box)}
            onMouseEnter={this.onEnterScrolling}
            onMouseLeave={this.onLeaveScrolling}
          >
            <div
              styleName="scroll-outer"
              ref={outer => (this.scrollOuter = outer)}
              onWheel={this.onScrollerWheel}
            >
              <div
                styleName="scroll-inner"
                ref={inner => (this.scroller = inner)}
              >
                {comments.map(n =>
                  <div key={n} styleName="comment-row">
                    {this.rCommentInner()}
                  </div>,
                )}
                <div styleName="comment-row-more">
                  <button styleName="more-btn" onClick={this.onLoadMore}>
                    查看更多留言
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
export default PublicComment;
