import React, { PropTypes } from 'react';

const ItemNavigation = props => (
  <div styleName={props.isVisible ? 'container-visible' : 'container-hide'}>
    <div styleName="inner" className="container clear">
      <div styleName="menu">
        1
      </div>
      <div styleName="order-header" />
    </div>
  </div>

);
export default ItemNavigation;
