import _ from 'lodash';
import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router';
import Dropdown from '../Dropdown';

const RENDER_TYPE_BUTTON = 'button';
const RENDER_TYPE_URL = 'externalLink';
const RENDER_TYPE_HREF = 'reactRouter';
class NavItem extends React.Component {

  static defaultProps = {
    className: null,
    children: null,
    action: null,
  };

  static propTypes = {
    className: PropTypes.string,
    children: PropTypes.node,
    content: PropTypes.oneOfType([
      PropTypes.node,
      PropTypes.string,
    ]).isRequired,
    action: PropTypes.oneOfType([
      PropTypes.func,
      PropTypes.string,
    ]),
  };

  getRenderType() {
    const { action, children } = this.props;
    if (children) {
      return RENDER_TYPE_BUTTON;
    }
    if (/^http[s]?:\/\//i.test(action)) {
      return RENDER_TYPE_URL;
    }
    return RENDER_TYPE_HREF;
  }

  renderLinkContent(content) {
    const { action, children } = this.props;
    switch (this.getRenderType()) {
      case RENDER_TYPE_BUTTON: {
        const buttonTrigger = (
          <button
            className="button"
            onClick={e => (this.dropdown.triggerClick(e))}
          >
            {content}
          </button>
        );
        return (
          <Dropdown
            trigger={buttonTrigger}
            ref={dropdown => (this.dropdown = dropdown)}
          >
            {children}
          </Dropdown>
        );
      }
      case RENDER_TYPE_URL:
        return <a href={action}>{content}</a>;
      default:
        return <Link to={action} >{content}</Link>;
    }
  }

  render() {
    const { className, content } = this.props;
    return (
      <li className="nav">
        {this.renderLinkContent(content)}
      </li>
    );
  }
}

export default NavItem;
