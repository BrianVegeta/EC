import React, { PropTypes } from 'react';
import FixedScroll from '../../../../../../components/FixedScroll';

const propTypes = {
  navigateSubcates: PropTypes.func.isRequired,
  categories: PropTypes.array.isRequired,
};
class Component extends React.Component {
  render() {
    const { categories, navigateSubcates } = this.props;
    return (
      <div styleName="container" >
        <FixedScroll>
          {categories.map((cate, i) =>
            <div
              key={`${i + 1}`}
              role="button"
              styleName="cateColumn"
              onClick={() => navigateSubcates(cate.id)}
            >
              {cate.text}
            </div>,
          )}
        </FixedScroll>
      </div>
    );
  }
}
Component.propTypes = propTypes;
export default Component;
