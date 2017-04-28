import React, { PropTypes } from 'react';
import { CATEGORY } from '../placeholder';

class Component extends React.Component {

  constructor(props) {
    super(props);
    this.fixScroll = this.fixScroll.bind(this);
    this.state = {
      isScrollLock: true,
    };
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
    return (
      <div {...this.props}>
        <button
          className="button"
          styleName="inputField"
        >
          {CATEGORY}
          <span style={{ float: 'right' }}>
            <span className="fa fa-angle-down" />
          </span>
        </button>
        <div styleName="dropdown">
          <div
            styleName="nailedPanel"
            ref={panel => (this.panel = panel)}
            onWheel={this.fixScroll}
          >
            <div ref={scroller => (this.scroller = scroller)}>
              {[...Array(30).keys()].map(i => (
                <div key={`${i + 1}`}>{i}</div>
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  }
}
export default Component;
