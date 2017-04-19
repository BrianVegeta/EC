import React, { PropTypes } from 'react';
import Navs from './Navs';

const propTypes = {
  isVisible: PropTypes.bool.isRequired,
};
const ItemNavigation = props => (
  <div styleName={props.isVisible ? 'container-visible' : 'container-hide'}>
    <div styleName="inner" className="container clear">
      <div styleName="menu">
        <Navs />
      </div>
    </div>
  </div>
);
ItemNavigation.propTypes = propTypes;
export default ItemNavigation;
