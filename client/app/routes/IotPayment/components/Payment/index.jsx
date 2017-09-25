import React from 'react';
import myPropTypes from 'propTypes';

import CSS from 'react-css-modules';
import styles from './styles.sass';

class Payment extends React.Component {

  static propTypes = {
    children: myPropTypes.children.isRequired,
  };


  render() {
    const { children } = this.props;
    return (
      <div styleName="main-wrapper">
        {children}
      </div>
    );
  }
}

export default CSS(Payment, styles);
