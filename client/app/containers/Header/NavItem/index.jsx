import React from 'react';
import PropTypes from 'prop-types';
import myPropTypes from 'propTypes';
import { Link } from 'react-router';
import { isFunction } from 'lodash';
import ReactHoverObserver from 'react-hover-observer';
import Dropdown from '../Dropdown';


const RENDER_TYPE_BUTTON = 'RENDER_TYPE_BUTTON';
const RENDER_TYPE_DROPDOWN = 'RENDER_TYPE_DROPDOWN';
const RENDER_TYPE_URL = 'RENDER_TYPE_URL';
const RENDER_TYPE_HREF = 'RENDER_TYPE_HREF';

class NavItem extends React.Component {

  static defaultProps = {
    className: null,
    children: null,
    action: null,
    link: null,
    style: null,
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
    link: PropTypes.string,
    style: myPropTypes.style,
  };

  getRenderType() {
    const { action, children } = this.props;
    if (children) {
      return RENDER_TYPE_DROPDOWN;
    }
    if (isFunction(action)) {
      return RENDER_TYPE_BUTTON;
    }
    if (/^http[s]?:\/\//i.test(action)) {
      return RENDER_TYPE_URL;
    }
    return RENDER_TYPE_HREF;
  }

  renderDropdownButton(content) {
    const { link } = this.props;
    if (link) {
      return (
        <ReactHoverObserver
          className="nav-hover"
          onHoverChanged={e => (this.dropdown.triggerClick(e))}
        >
          <div style={{ display: 'inline-block' }}>
            <Link to={link}>{content}</Link>
          </div>
        </ReactHoverObserver>
      );
    }
    return (
      <button
        className="button"
        onClick={e => (this.dropdown.triggerClick(e))}
      >
        {content}
      </button>
    );
  }

  renderNavContent(renderType) {
    const {
      content,
      children,
      action,
      className,
    } = this.props;

    switch (renderType) {
      case RENDER_TYPE_DROPDOWN:
        return (
          <Dropdown
            trigger={this.renderDropdownButton(content)}
            ref={dropdown => (this.dropdown = dropdown)}
          >
            {children}
          </Dropdown>
        );

      case RENDER_TYPE_BUTTON:
        return (
          <button
            className={`button ${className}`}
            onClick={action}
          >
            {content}
          </button>
        );

      case RENDER_TYPE_URL:
        return (
          <a href={action}>{content}</a>
        );

      case RENDER_TYPE_HREF:
        return (
          <Link to={action} >{content}</Link>
        );

      default:
        throw new Error('RENDER TYPE ERROR');
    }
  }

  render() {
    const renderType = this.getRenderType();
    const { style } = this.props;
    return (
      <li className="nav" style={style}>
        {this.renderNavContent(renderType)}
      </li>
    );
  }
}

export default NavItem;
