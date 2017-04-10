import React, { PropTypes } from 'react';

class Header extends React.Component {
  render() {
    return (
      <div styleName="container">
        <div styleName="context">
          <div styleName="breadcrumb">
            Home
            <span styleName="arrow">
              <i className="fa fa-angle-right" aria-hidden="true" />
            </span>
            物品
          </div>
          <div styleName="title">
            <h1>
              <span styleName="icon">
                <i className="fa fa-suitcase" aria-hidden="true" />
              </span>
              全部物品
            </h1>
          </div>
        </div>
      </div>
    );
  }
}

export default Header;
