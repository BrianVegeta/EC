import React, { PropTypes } from 'react';
import CSS from 'react-css-modules';
import Navs from './Navs';
import styles from './styles.sass';

const propTypes = {
  isVisible: PropTypes.bool.isRequired,
};
const ItemNavigation = props => (
  <div styleName={props.isVisible ? 'container-visible' : 'container-hide'}>
    <div styleName="inner" className="container clear">
      <div styleName="menu">
        <Navs {...props} />
      </div>
    </div>
  </div>
);
ItemNavigation.propTypes = propTypes;
export default CSS(ItemNavigation, styles);
