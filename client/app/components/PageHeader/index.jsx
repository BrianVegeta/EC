import React from 'react';
import myPropTypes from 'propTypes';

import CSS from 'react-css-modules';
import styles from './styles.sass';

class PageHeader extends React.Component {

  static propTypes = {
    children: myPropTypes.children.isRequired,
  };

  render() {
    return (
      <div styleName="container">
        {this.props.children}
      </div>
    );
  }
}

export default CSS(PageHeader, styles);
