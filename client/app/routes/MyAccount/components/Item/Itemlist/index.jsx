import React from 'react';
import CSS from 'react-css-modules';
import myPropTypes from 'propTypes';
import styles from './styles.sass';

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
