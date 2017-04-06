import React, { PropTypes } from 'react';

class Content extends React.Component {
  render() {
    return (
      <div styleName="container">
        <div styleName="sidebar">{this.props.sidebar}</div>
        <div styleName="main" >{this.props.children}</div>
      </div>
    );
  }
}

export default Content;
