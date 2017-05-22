import React, { PropTypes } from 'react';
import { CATEGORY } from '../placeholder';
import DropdownBox from './DropdownBox';

const propTypes = {
  className: PropTypes.string.isRequired,
  items: PropTypes.object.isRequired,
};
class Component extends React.Component {
  constructor(props) {
    super(props);
    this.onFocus = this.onFocus.bind(this);
    this.onBlur = this.onBlur.bind(this);
    this.state = {
      isDropdowning: false,
    };
  }

  onFocus() {
    const isDropdowning = true;
    this.setState({ isDropdowning });
  }

  onBlur() {
    const isDropdowning = false;
    this.setState({ isDropdowning });
  }

  render() {
    const { categories } = this.props.items;
    const { isDropdowning } = this.state;
    return (
      <div className={this.props.className}>
        <button
          className="button"
          styleName="inputButton"
          onFocus={this.onFocus}
          onBlur={this.onBlur}
        >
          <div styleName="inputContainer">
            {CATEGORY}
            <span style={{ float: 'right' }}>
              <span className="fa fa-angle-down" />
            </span>
          </div>
          {
            categories.goods &&
            isDropdowning &&
            <DropdownBox categories={categories.goods} onFocus={() => console.log('focus')} />
          }
        </button>
      </div>
    );
  }
}
Component.propTypes = propTypes;
export default Component;
