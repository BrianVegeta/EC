import React, { PropTypes } from 'react';
import {
  setCategorySelectionParent,
  purgeCategorySelectionParent,
} from '../../../../../actions/releaseActions';

const propTypes = {
  dispatch: PropTypes.func.isRequired,
  categories: PropTypes.array.isRequired,
};
class Component extends React.Component {

  constructor(props) {
    super(props);
    this.fixScroll = this.fixScroll.bind(this);
    this.setParentCategory = this.setParentCategory.bind(this);
    this.forwardPrevPage = this.forwardPrevPage.bind(this);
  }

  setParentCategory(id) {
    this.props.dispatch(setCategorySelectionParent(id));
  }

    forwardPrevPage() {
    this.props.dispatch(purgeCategorySelectionParent());
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
    const { categories, style, hasPrev } = this.props;
    return (
      <div
        {...{ style }}
        styleName="container"
        ref={panel => (this.panel = panel)}
        onWheel={this.fixScroll}
      >
        <div ref={scroller => (this.scroller = scroller)}>
          {categories.map((cate, i) => {
            const onClick =
              cate.subcates && (() => this.setParentCategory(cate.id));
            return (
              <div
                key={`${i + 1}`}
                role="button"
                styleName="cateColumn"
                onClick={onClick}
              >
                {cate.text}
              </div>
            );
          })}
          { hasPrev &&
            <button onClick={this.forwardPrevPage}> prev </button> }
        </div>
      </div>
    );
  }
}
Component.propTypes = propTypes;
export default Component;
