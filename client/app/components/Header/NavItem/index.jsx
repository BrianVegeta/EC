import _ from 'lodash';
import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router';

class NavItem extends React.Component {
  static defaultProps = {
    display: 'text',
    className: null,
  };
  static propTypes = {
    display: PropTypes.oneOf(['text', 'icon', 'avatar']),
    className: PropTypes.string,
    children: PropTypes.node.isRequired,
    action: PropTypes.oneOfType([
      PropTypes.func,
      PropTypes.string,
    ]).isRequired,
  };
  renderLinkContent(children) {
    const { action } = this.props;
    if (_.isFunction(action)) {
      return <button className="button iconOuter">{children}</button>;
    }
    if (/^http[s]?:\/\//i.test(action)) {
      return <a href={action}>{children}</a>;
    }
    return <Link to={action} >{children}</Link>;
  }
  render() {
    const { display, className, children } = this.props;
    return (
      <li className={className}>
        { this.renderLinkContent(children) }
      </li>
    );
  }
}

export default NavItem;
