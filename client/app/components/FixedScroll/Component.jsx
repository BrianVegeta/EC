import React, { PropTypes } from 'react';

class FixedScroll extends React.Component {

  constructor(props) {
    super(props);
    this.fixScroll = this.fixScroll.bind(this);
  }

  fixScroll(e) {
    // TODO: fix scroll
    const deltaY = -e.deltaY;
    const boxHeight = this.panel.clientHeight;
    const scrollerHeight = this.scroller.scrollHeight;
    const top = this.panel.scrollTop;
    const bottom = (scrollerHeight - top) + deltaY;
    const isAtTop = deltaY > 0 && top - deltaY <= 0;
    const isAtBottom = deltaY < 0 && bottom <= boxHeight;

    if (isAtTop) {
      this.panel.scrollTop = 0;
      e.preventDefault();
      e.stopPropagation();
    }

    if (isAtBottom) {
      this.panel.scrollTop = scrollerHeight - boxHeight;
      e.preventDefault();
      e.stopPropagation();
    }
  }

  render() {
    const { style } = this.props;
    return (
      <div
        {...{ style }}
        styleName="container"
        ref={panel => (this.panel = panel)}
        onWheel={this.fixScroll}
      >
        <div ref={scroller => (this.scroller = scroller)}>
          {this.props.children}
        </div>
      </div>
    );
  }
}

export default FixedScroll;
