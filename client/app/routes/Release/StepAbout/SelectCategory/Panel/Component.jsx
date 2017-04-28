import React, { PropTypes } from 'react';
import {
  setCategorySelectionParent,
  purgeCategorySelectionParent,
} from '../../../../../actions/releaseActions';
import FixedScroll from '../../../../../components/FixedScroll';

const propTypes = {
  dispatch: PropTypes.func.isRequired,
  categories: PropTypes.array.isRequired,
};
class Component extends React.Component {

  constructor(props) {
    super(props);
    this.setParentCategory = this.setParentCategory.bind(this);
    this.forwardPrevPage = this.forwardPrevPage.bind(this);
  }

  setParentCategory(id) {
    this.props.dispatch(setCategorySelectionParent(id));
  }

  forwardPrevPage() {
    this.props.dispatch(purgeCategorySelectionParent());
  }

  render() {
    const { categories, style, isSubcate } = this.props;
    return (
      <div styleName="container" {...{ style }}>
        <FixedScroll>
          {categories.map((cate, i) => {
            const onClick =
              !isSubcate && (() => this.setParentCategory(cate.id));
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
          { isSubcate &&
            <button onClick={this.forwardPrevPage}> prev </button> }
        </FixedScroll>
      </div>
    );
  }
}
Component.propTypes = propTypes;
export default Component;
