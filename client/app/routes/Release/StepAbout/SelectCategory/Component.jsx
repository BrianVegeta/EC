import React, { PropTypes } from 'react';
import { CATEGORY } from '../placeholder';
import Panel from './Panel';

const _ = require('lodash');

const propTypes = {
  className: PropTypes.string.isRequired,
  items: PropTypes.object.isRequired,
  release: PropTypes.object.isRequired,
};
class Component extends React.Component {

  render() {
    const { categories } = this.props.items;
    const { parentId } = this.props.release.categorySelection;
    const selectedCategory = (parentId && _.find(categories.goods, c => (c.id === parentId)));
    const subCategories = (selectedCategory ? selectedCategory.subcates : []);
    const subPanelStyle = parentId ? { right: 320 } : { right: 0 };
    console.log(subPanelStyle);

    return (
      <div className={this.props.className}>
        <button
          className="button"
          styleName="inputField"
        >
          {CATEGORY}
          <span style={{ float: 'right' }}>
            <span className="fa fa-angle-down" />
          </span>
        </button>
        {
          categories.goods &&
          <div styleName="dropdown">
            <div styleName="dropdownBox">
              <div style={{ width: 640 }}>
                <Panel categories={categories.goods} {...this.props} />
                <Panel categories={subCategories} {...this.props} style={subPanelStyle} hasPrev />
              </div>
            </div>
          </div>
        }
      </div>
    );
  }
}
Component.propTypes = propTypes;
export default Component;
