import React, { PropTypes } from 'react'

class Component extends React.Component {

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
    const { categories, style } = this.props;
    return (
      <div
        {...{ style }}
        styleName="container"
        ref={panel => (this.panel = panel)}
        onWheel={this.fixScroll}
      >
        <div ref={scroller => (this.scroller = scroller)}>
          {categories.map((cate, i) => (
            <div
              key={`${i + 1}`}
              role="button"
              styleName="cateColumn"
              onClick={() => console.log(1)}
            >
              {cate.text}
            </div>
          ))}
        </div>
      </div>
    );
  }
}

export default Component;
