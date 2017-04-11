import React, { PropTypes } from 'react';

class Header extends React.Component {
  render() {
    return (
      <div styleName="container">
        <span styleName="icon">
          <i className="fa fa-suitcase" />
        </span>
        <span styleName="title">全部物品</span>
      </div>
    );
  }
}
export default Header;
