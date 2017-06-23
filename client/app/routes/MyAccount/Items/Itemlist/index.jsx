import React from 'react';
import CSS from 'react-css-modules';
import styles from './styles.sass';
import myPropTypes from '../../../../propTypes';

class ItemList extends React.Component {
  static propTypes = {
    children: myPropTypes.children.isRequired,
  };
  render() {
    const { children } = this.props;
    return (
      <div styleName="container">{children}</div>
    );
  }
}

export default CSS(ItemList, styles);
