import React, { PropTypes } from 'react';

const propTypes = {
  children: PropTypes.node.isRequired,
  sidebar: PropTypes.node.isRequired,
};
const Layout = props => (
  <div styleName="container" className="clear">
    <div styleName="main">{props.children}</div>
    <div styleName="sidebar">{props.sidebar}</div>
  </div>
);
Layout.propTypes = propTypes;
export default Layout;
