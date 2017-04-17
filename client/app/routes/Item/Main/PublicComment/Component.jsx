import React, { PropTypes } from 'react';

class PublicComment extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      comments: [1, 2, 3, 4],
      scrollBoxHeight: false,
    };
    this.onLoadMore = this.onLoadMore.bind(this);
    this.onScrollerWheel = this.onScrollerWheel.bind(this);
  }

  componentWillMount() {
    // const style = window.getComputedStyle(this.scrollInner);
    // console.log(style.height);
  }

  componentDidMount() {
    const style = window.getComputedStyle(this.scroller);
    this.onMount(style);
  }

  onMount(style) {
    this.setState({ scrollBoxHeight: style.height });
  }

  onLoadMore() {
    const length = this.state.comments.length + 1;
    const comments = this.state.comments.concat([length + 1, length + 2, length + 3, length + 4]);
    this.setState({ comments });
  }

  onScrollerWheel() {
    console.log(this.scroller.scrollTop);
  }

  isScrollVisible() {
    const { scrollBoxHeight } = this.state;
    const style = window.getComputedStyle(this.scroller);
    return style.height > scrollBoxHeight;
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
            有沒有更清楚的規格可以看？有沒有更清楚的規格可以看？有沒有更清楚的規格可以看？有沒有更清楚的規格可以看？有沒有更清楚的規格可以看？有沒有更清楚的規格可以看？有沒有更清楚的 ...顯示更多
          </div>
        </div>
      </div>
    );
  }

  render() {
    const { scrollBoxHeight, comments } = this.state;
    console.log(scrollBoxHeight);
    return (
      <div styleName="container">
        <h2 styleName="title">公開留言 | 86則</h2>
        <div styleName="comments-scroll-box" style={{ height: scrollBoxHeight || null }}>
          <div
            styleName="scroll-inner"
            ref={inner => (this.scroller = inner)}
            onWheel={this.onScrollerWheel}
          >
            {comments.map(n =>
              <div key={n} styleName="comment-row">{this.rCommentInner()}</div>,
            )}
            <div styleName="comment-row-more">
              <button styleName="more-btn" onClick={this.onLoadMore}>
                查看更多留言
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
export default PublicComment;
