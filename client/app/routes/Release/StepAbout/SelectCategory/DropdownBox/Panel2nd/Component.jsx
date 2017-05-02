import React, { PropTypes } from 'react';
import FixedScroll from '../../../../../../components/FixedScroll';

const defaultProps = {
  style: {},
};
const propTypes = {
  prevPage: PropTypes.func.isRequired,
  categories: PropTypes.array.isRequired,
  style: PropTypes.object,
};
class Component extends React.Component {
  render() {
    const { categories, style, prevPage } = this.props;
    return (
      <div styleName="container" {...{ style }}>
        <FixedScroll>
          {categories.map((cate, i) =>
            <div
              key={`${i + 1}`}
              role="button"
              styleName="cateColumn"
            >
              {cate.text}
            </div>,
          )}
          { <button onClick={() => prevPage()}> prev </button> }
        </FixedScroll>
      </div>
    );
  }
}
Component.defaultProps = defaultProps;
Component.propTypes = propTypes;
export default Component;
