import React, { PropTypes } from 'react';
import { CATEGORY } from '../placeholder';
import DropdownBox from './DropdownBox';

const propTypes = {
  className: PropTypes.string.isRequired,
  items: PropTypes.object.isRequired,
};
class Component extends React.Component {

  render() {
    const { categories } = this.props.items;
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
        { categories.goods && <DropdownBox categories={categories.goods} /> }
      </div>
    );
  }
}
Component.propTypes = propTypes;
export default Component;
