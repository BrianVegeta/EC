import React from 'react';
import CSS from 'react-css-modules';
import styles from './styles.sass';
import CollectionHeader from '..//CollectionHeader';


class ResultCollection extends React.Component {
  render() {
    return (
      <div styleName="container">
        <div styleName="block">
          <CollectionHeader headerText="用戶" />
        </div>
        <div styleName="block">
          <CollectionHeader headerText="許願紙條" />
        </div>
        <div styleName="block">
          <CollectionHeader headerText="物品" />
        </div>
      </div>
    );
  }
}

export default CSS(ResultCollection, styles);
