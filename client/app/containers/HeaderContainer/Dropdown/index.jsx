import React from 'react';
import PropTypes from 'prop-types';
import myPropTypes from 'propTypes';

import CSS from 'react-css-modules';
import styles from './styles.sass';

class Dropdown extends React.Component {

  static propTypes = {
    children: myPropTypes.children.isRequired,
    trigger: PropTypes.node.isRequired,
  };

  constructor(props) {
    super(props);
    this.triggerClick = this.triggerClick.bind(this);
    this.handleClickOutside = this.handleClickOutside.bind(this);
    this.state = {
      isOpen: false,
    };
  }

  componentWillUnmount() {
    document.removeEventListener('click', this.handleClickOutside, false);
  }

  triggerClick() {
    if (!this.state.isOpen) {
      document.addEventListener('click', this.handleClickOutside, false);
    } else {
      document.removeEventListener('click', this.handleClickOutside, false);
    }
    this.setState({ isOpen: !this.state.isOpen });
  }

  handleClickOutside(e) {
    if (this.dropdown.contains(e.target)) {
      return;
    }
    this.triggerClick();
  }

  render() {
    return (
      <div
        styleName="container"
        ref={dropdown => (this.dropdown = dropdown)}
      >
        {this.props.trigger}
        {this.state.isOpen &&
          <div styleName="dropdown" >
            {this.props.children}
          </div>
        }
      </div>
    );
  }
}

export default CSS(Dropdown, styles);
