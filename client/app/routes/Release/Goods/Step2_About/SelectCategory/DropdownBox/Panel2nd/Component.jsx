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
    const { categories, style, prevPage, pickingParent } = this.props;
    return (
      <div styleName="container" {...{ style }}>
        <FixedScroll>
          <div style={{ height: 45, width: '100%', position: 'absolute' }}>
            <div
              className="button"
              styleName="controlColumn"
              style={{ width: '100%', textAlign: 'left' }}
              onClick={() => prevPage()}
            >
              <span className="fa fa-angle-left" />
              {pickingParent && <span>{pickingParent.text}</span>}
            </div>
          </div>
          <div style={{ height: 45, width: '100%' }} />
          {categories.map((cate, i) =>
            <div
              key={`${i + 1}`}
              role="button"
              styleName="cateColumn"
            >
              {cate.text}
            </div>,
          )}
        </FixedScroll>
      </div>
    );
  }
}
Component.defaultProps = defaultProps;
Component.propTypes = propTypes;
export default Component;
